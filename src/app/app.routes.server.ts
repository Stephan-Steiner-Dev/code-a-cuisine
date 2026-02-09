import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * serverRoutes
 *
 * Defines how routes are rendered when using Angular Server-Side Rendering (SSR).
 *
 * Render modes:
 * - Client: Route is rendered entirely on the client.
 * - Prerender: Route is prerendered at build time and served as static HTML.
 */
export const serverRoutes: ServerRoute[] = [
  /**
   * The cookbook route is rendered only on the client.
   * Useful when dynamic or client-only behavior is required.
   */
  { path: 'cookbook', renderMode: RenderMode.Client },

  /**
   * Fallback route configuration.
   * All other routes are prerendered at build time.
   */
  { path: '**', renderMode: RenderMode.Prerender },
];