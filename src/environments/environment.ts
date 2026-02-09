/**
 * environment
 *
 * Environment configuration used during development builds.
 * Contains application-wide configuration values such as Firebase settings.
 *
 * A separate environment configuration is typically used for production builds.
 */
export const environment = {

  /** Indicates whether the application runs in production mode. */
  production: false,

  /**
   * Firebase configuration object used to initialize AngularFire.
   * Values are provided from the Firebase project settings.
   */
  firebase: {
    apiKey: '...',
    authDomain: '...',
    databaseURL: 'https://code-a-cuisine-cb416-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...',
  }
};
