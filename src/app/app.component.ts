import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'code-a-cuisine';
  whiteBgRoutes = ['/select-ingredients', '/preferences', '/selected-recipe', '/cookbook', '/cookbook-collection'];
  private router = inject(Router)

  isWhiteBgRoute(): boolean {
    return this.whiteBgRoutes.includes(this.router.url);
  }
}
