import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'code-a-cuisine';
  whiteBgRoutes = ['/select-ingredients', '/preferences'];

   constructor(public router: Router) {}

    isWhiteBgRoute(): boolean {
    return this.whiteBgRoutes.includes(this.router.url);
  }
}
