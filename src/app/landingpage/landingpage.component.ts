import { Component, inject } from "@angular/core";
import { Router } from '@angular/router';

/**
 * LandingpageComponent
 *
 * Entry page of the application providing navigation to the main user flows:
 * - Ingredient selection to start generating recipes
 * - Cookbook view to browse saved or available recipes
 *
 * Navigation is handled through Angular's Router.
 */
@Component({
    standalone: true,
    selector: 'app-landingpage',
    imports: [],
    templateUrl: './landingpage.component.html',
    styleUrls: ['./landingpage.component.scss', './landingpage.mobile.scss']
})
export class LandingpageComponent {

  /** Angular router instance used for page navigation (injected). */
  private router = inject(Router);

  /**
   * Navigates the user to the ingredient selection flow,
   * typically the starting point for recipe generation.
   */
  getStarted() {
    this.router.navigate(['/select-ingredients']);
  }

  /**
   * Navigates the user to the cookbook page,
   * where recipes can be browsed or accessed.
   */
  navigateToCookbook(){
    this.router.navigate(['/cookbook']);
  }
}

