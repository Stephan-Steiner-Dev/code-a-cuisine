import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server'; 

import { provideLottieOptions } from 'ngx-lottie';

/**
 * serverConfig
 *
 * Application configuration used specifically for server-side rendering (SSR).
 *
 * Responsibilities:
 * - Enables Angular server rendering with server-specific routes
 * - Configures Lottie to use a no-op player on the server, since animations
 *   cannot run in a non-browser environment
 */
const serverConfig: ApplicationConfig = {
  providers: [
    /**
     * Enables server-side rendering and provides server route configuration.
     */
    provideServerRendering(withRoutes(serverRoutes)),

    /**
     * Configures ngx-lottie for SSR.
     * Since animations cannot be rendered on the server,
     * a dummy player implementation is provided.
     */
    provideLottieOptions({ player: () => null as any }),
  ]
};

/**
 * Final application configuration for the server build.
 * Merges the base app configuration with the server-specific configuration.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
