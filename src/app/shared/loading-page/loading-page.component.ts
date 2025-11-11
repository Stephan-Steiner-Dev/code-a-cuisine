import { Component } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss', './loading-page.mobile.scss',]
})
export class LoadingPageComponent {

  options: AnimationOptions = {
    path: 'assets/animations/bowl.json',
    loop: true,
    autoplay: true,
  };
}
