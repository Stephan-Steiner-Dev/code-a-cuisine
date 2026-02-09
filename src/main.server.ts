import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * bootstrap
 *
 * Entry point used for server-side rendering (SSR) bootstrapping.
 * Initializes the Angular application with server configuration.
 *
 * @param context Bootstrap context provided by the SSR runtime
 * @returns Promise resolving to the bootstrapped application instance
 */
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, config, context);

/**
 * Default export required by Angular SSR to bootstrap the application.
 */
export default bootstrap;