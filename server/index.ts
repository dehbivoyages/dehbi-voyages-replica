import express, { type Request, type Response } from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { createServer as createViteServer } from "vite";
import {
  bookingRequests,
  contactMessages,
  newsletterSubscribers,
  organizedTrips,
} from "../drizzle/schema";
import { removeViteClientScript, viteServerOptions } from "./viteOptions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
const db = process.env.DATABASE_URL ? drizzle(process.env.DATABASE_URL) : null;

const text = (value: unknown, maxLength = 2000) => {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized ? normalized.slice(0, maxLength) : null;
};

const sendError = (res: Response, status: number, message: string) => {
  res.status(status).json({ success: false, error: message });
};

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "200kb" }));

  app.get("/api/health/database", async (_req, res) => {
    if (!db) return sendError(res, 503, "Database unavailable");
    try {
      const rows = await db.select({ id: organizedTrips.id }).from(organizedTrips).limit(1);
      res.json({ success: true, connected: true, tripsTableReady: rows.length >= 0 });
    } catch (error) {
      console.error("[Database] health check failed", error);
      sendError(res, 503, "Database unavailable");
    }
  });

  app.get("/api/trips", async (_req, res) => {
    if (!db) return sendError(res, 503, "Database unavailable");
    try {
      const rows = await db.select().from(organizedTrips).where(eq(organizedTrips.active, true));
      res.json(rows.map((trip) => ({ ...trip, highlights: JSON.parse(trip.highlights) })));
    } catch (error) {
      console.error("[Database] trips query failed", error);
      sendError(res, 500, "Unable to load trips");
    }
  });

  app.post("/api/booking-requests", async (req: Request, res: Response) => {
    if (!db) return sendError(res, 503, "Database unavailable");
    const body = req.body as Record<string, unknown>;
    const name = text(body.name, 160);
    const requestType = text(body.requestType, 20);
    if (!name || !["reservation", "quote", "flight", "hotel"].includes(requestType ?? "")) {
      return sendError(res, 400, "Missing booking request details");
    }
    try {
      const result = await db.insert(bookingRequests).values({
        userId: typeof body.userId === "number" ? body.userId : undefined,
        tripId: text(body.tripId, 160) ?? undefined,
        requestType: requestType as "reservation" | "quote" | "flight" | "hotel",
        name,
        email: text(body.email, 320) ?? undefined,
        phone: text(body.phone, 40) ?? undefined,
        origin: text(body.origin, 160) ?? undefined,
        destination: text(body.destination, 160) ?? undefined,
        travelDate: text(body.travelDate, 30) ?? undefined,
        details: text(body.details, 4000) ?? undefined,
      });
      res.status(201).json({ success: true, id: result[0].insertId });
    } catch (error) {
      console.error("[Database] booking insert failed", error);
      sendError(res, 500, "Unable to save booking request");
    }
  });

  app.post("/api/contact-messages", async (req: Request, res: Response) => {
    if (!db) return sendError(res, 503, "Database unavailable");
    const body = req.body as Record<string, unknown>;
    const name = text(body.name, 160);
    const message = text(body.message, 4000);
    if (!name || !message) return sendError(res, 400, "Name and message are required");
    try {
      const result = await db.insert(contactMessages).values({
        name,
        email: text(body.email, 320) ?? undefined,
        phone: text(body.phone, 40) ?? undefined,
        subject: text(body.subject, 200) ?? undefined,
        message,
      });
      res.status(201).json({ success: true, id: result[0].insertId });
    } catch (error) {
      console.error("[Database] contact insert failed", error);
      sendError(res, 500, "Unable to save contact message");
    }
  });

  app.post("/api/newsletter", async (req: Request, res: Response) => {
    if (!db) return sendError(res, 503, "Database unavailable");
    const body = req.body as Record<string, unknown>;
    const email = text(body.email, 320)?.toLowerCase();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return sendError(res, 400, "A valid email is required");
    try {
      await db.insert(newsletterSubscribers).values({ email, name: text(body.name, 160) ?? undefined }).onDuplicateKeyUpdate({ set: { active: true } });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("[Database] newsletter insert failed", error);
      sendError(res, 500, "Unable to save newsletter subscription");
    }
  });

  const staticPath = isProduction
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  if (!isProduction) {
    // The hosted WebDev preview does not expose Vite's HMR WebSocket.
    // Disable HMR here as well as in vite.config.ts to avoid client reconnect errors.
    const vite = await createViteServer({ server: viteServerOptions, appType: "spa" });
    app.use(async (req, res, next) => {
      const acceptsHtml = req.headers.accept?.includes("text/html");
      if (req.method !== "GET" || req.originalUrl.startsWith("/api/") || !acceptsHtml) return next();
      try {
        const template = await vite.transformIndexHtml(req.originalUrl, "<!doctype html><html><head></head><body><div id=\"root\"></div><script type=\"module\" src=\"/src/main.tsx\"></script></body></html>");
        // This hosted preview has no public HMR socket. Vite may still inject
        // its client script during HTML transformation, so remove it explicitly
        // to prevent the browser from retrying a WebSocket that cannot open.
        const previewTemplate = removeViteClientScript(template);
        res.status(200).set({ "Content-Type": "text/html" }).end(previewTemplate);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => res.sendFile(path.join(staticPath, "index.html")));
  }

  const port = Number(process.env.PORT || 3000);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
