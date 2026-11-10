import { describe, expect, it } from 'vitest';
import { removeViteClientScript, viteServerOptions } from '../../server/viteOptions';

describe('Vite hosted preview configuration', () => {
  it('keeps the HMR websocket disabled in middleware mode', () => {
    expect(viteServerOptions.middlewareMode).toBe(true);
    expect(viteServerOptions.hmr).toBe(false);
  });

  it('removes the injected Vite client from preview HTML', () => {
    const html = '<head><script type="module" src="/@vite/client"></script></head><body></body>';
    expect(removeViteClientScript(html)).not.toContain('/@vite/client');
  });
});
