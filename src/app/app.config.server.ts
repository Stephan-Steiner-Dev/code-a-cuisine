// import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// import { provideServerRendering } from '@angular/platform-server';
// import { appConfig } from './app.config';

// import { provideLottieOptions } from 'ngx-lottie';

// const serverConfig: ApplicationConfig = {
//   providers: [
//     provideServerRendering(),

//     // sorgt dafür, dass SSR/Prerender nicht an NG0201 (LottieOptions) scheitert
//     provideLottieOptions({ player: () => null as any }),
//   ]
// };

// export const config = mergeApplicationConfig(appConfig, serverConfig);

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server'; 

import { provideLottieOptions } from 'ngx-lottie';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),

    // Lottie im SSR neutralisieren
    provideLottieOptions({ player: () => null as any }),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

