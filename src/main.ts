import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

bootstrapApplication(AppComponent, {
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player
    })
  ]
});
