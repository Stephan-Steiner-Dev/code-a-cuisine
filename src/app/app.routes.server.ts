import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'cookbook', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Prerender },
];
