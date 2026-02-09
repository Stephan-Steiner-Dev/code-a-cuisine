import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

/**
 * appConfig
 *
 * Root application configuration used during client-side bootstrapping.
 *
 * Responsibilities:
 * - Provides application routes
 * - Enables client hydration for SSR setups
 * - Registers HTTP client services
 * - Initializes Firebase
 * - Provides Firebase Realtime Database access
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Registers application routes for navigation.
     */
    provideRouter(routes),

    /**
     * Enables client hydration when SSR is used,
     * allowing server-rendered content to become interactive.
     */
    provideClientHydration(),

    /**
     * Provides Angular's HttpClient across the application.
     */
    provideHttpClient(),

    /**
     * Initializes the Firebase application using environment configuration.
     */
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    /**
     * Provides Firebase Realtime Database access.
     */
    provideDatabase(() => getDatabase()),
  ]
};