import { Component } from "@angular/core";
import { LottieComponent, AnimationOptions } from "ngx-lottie";

/**
 * LoadingPageComponent
 *
 * Displays a loading screen using a Lottie animation while data or recipes
 * are being prepared in the background.
 *
 * Animation behavior is configured via AnimationOptions.
 */
@Component({
    standalone: true,
    selector: 'app-loading-page',
    imports: [LottieComponent],
    templateUrl: './loading-page.component.html',
    styleUrls: ['./loading-page.component.scss', './loading-page.mobile.scss',]
})
export class LoadingPageComponent {

  /**
   * Configuration for the Lottie animation.
   * - path: location of the animation JSON file
   * - loop: repeats animation continuously
   * - autoplay: starts animation automatically on load
   */
  options: AnimationOptions = {
    path: 'assets/animations/bowl.json',
    loop: true,
    autoplay: true,
  };
}

