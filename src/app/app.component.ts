import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

/**
 * AppComponent
 *
 * Root component of the application.
 * Hosts the router outlet and global layout elements such as the header.
 *
 * It also determines whether certain routes should use a white background,
 * allowing layout styling to adapt depending on the current page.
 */
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  /** Application title (currently unused but available for UI binding). */
  title = 'code-a-cuisine';

  /**
   * Routes that should use a white background layout.
   * Used by `isWhiteBgRoute()` to control styling logic.
   */
  whiteBgRoutes = [
    '/select-ingredients',
    '/preferences',
    '/selected-recipe',
    '/cookbook',
    '/cuisine-collection'
  ];

  /** Angular Router instance used to access the current route (injected). */
  private router = inject(Router);

  /**
   * Checks whether the current route should display a white background.
   *
   * @returns true if current route is in `whiteBgRoutes`, otherwise false
   */
  isWhiteBgRoute(): boolean {
    return this.whiteBgRoutes.includes(this.router.url);
  }
}