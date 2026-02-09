import { Component, inject } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';

/**
 * RecipesComponent
 *
 * Displays a list of generated or available recipes and provides navigation:
 * - Back to ingredient selection
 * - To a specific selected recipe by index
 *
 * The currently selected recipe index is stored in IngredientService.
 */
@Component({
  standalone: true,
  selector: 'app-recipes',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss', './recipes.mobile.scss']
})
export class RecipesComponent {
  /** Angular Router used for navigation (injected). */
  private router = inject(Router);

  /** Provides access to recipe list and selected recipe index (injected). */
  public ingredientService = inject(IngredientService);

  /** Shared application data service (injected). */
  public dataService = inject(DataService);

  constructor() { }

  /**
   * Navigates the user back to the ingredient selection page.
   */
  navigateToIngredients() {
    this.router.navigate(['./select-ingredients']);
  }

  /**
   * Sets the selected recipe index and navigates to the recipe detail view.
   *
   * @param i Index of the recipe within IngredientService.recipes
   */
  navigateToSelectedRecipe(i: number) {
    this.ingredientService.currentRecipe = i;
    this.router.navigate(['./selected-recipe']);
  }
}