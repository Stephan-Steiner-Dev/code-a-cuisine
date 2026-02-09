import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

/**
 * Determines whether the application runs in a browser environment.
 * Used to avoid initializing browser-only features during SSR.
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Client-side bootstrap entry point.
 *
 * Bootstraps the Angular application and configures:
 * - Application providers from appConfig
 * - HTTP client
 * - Lottie animation player (browser only)
 */
bootstrapApplication(AppComponent, {
  providers: [
    /**
     * Application-wide providers defined in app configuration.
     */
    ...(appConfig.providers ?? []),

    /**
     * Provides Angular's HttpClient.
     * Included here to ensure availability in client bootstrap.
     */
    provideHttpClient(),

    /**
     * Configures ngx-lottie with the browser animation player.
     * Only applied when running in a browser environment.
     */
    ...(isBrowser
      ? [
          provideLottieOptions({
            player: () => player,
          }),
        ]
      : []),
  ],
});