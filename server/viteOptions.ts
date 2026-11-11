export const viteServerOptions = {
  middlewareMode: true,
  hmr: false,
  ws: false,
} as const;

export function removeViteClientScript(html: string) {
  return html.replace(/\s*<script[^>]+src=["']\/\@vite\/client["'][^>]*><\/script>/g, '');
}
