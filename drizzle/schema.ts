import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

/** Comptes issus de l’authentification Manus OAuth. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** Catalogue des voyages organisés, repris depuis le catalogue actuel du site. */
export const organizedTrips = mysqlTable("organized_trips", {
  id: varchar("id", { length: 160 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dates: text("dates").notNull(),
  endDate: varchar("endDate", { length: 10 }),
  imageUrl: text("imageUrl").notNull(),
  pdfUrl: text("pdfUrl"),
  destination: varchar("destination", { length: 80 }).notNull(),
  price: varchar("price", { length: 120 }).notNull(),
  highlights: text("highlights").notNull(),
  featured: boolean("featured").default(false).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Demandes de réservation, devis, billetterie aérienne et hôtels. */
export const bookingRequests = mysqlTable("booking_requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  tripId: varchar("tripId", { length: 160 }),
  requestType: mysqlEnum("requestType", ["reservation", "quote", "flight", "hotel"]).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 40 }),
  origin: varchar("origin", { length: 160 }),
  destination: varchar("destination", { length: 160 }),
  travelDate: varchar("travelDate", { length: 30 }),
  details: text("details"),
  status: mysqlEnum("status", ["new", "processing", "confirmed", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Messages envoyés depuis le formulaire de contact. */
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** Favoris persistants des clients authentifiés. */
export const favorites = mysqlTable(
  "favorites",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    tripId: varchar("tripId", { length: 160 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => ({
    userTripUnique: unique("favorites_user_trip_unique").on(table.userId, table.tripId),
  }),
);

/** Inscriptions à la newsletter. */
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 160 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Paramètres administrables du site, conservés sous forme clé/valeur. */
export const siteSettings = mysqlTable("site_settings", {
  key: varchar("key", { length: 120 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type OrganizedTrip = typeof organizedTrips.$inferSelect;
export type InsertOrganizedTrip = typeof organizedTrips.$inferInsert;
export type BookingRequest = typeof bookingRequests.$inferSelect;
export type InsertBookingRequest = typeof bookingRequests.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
