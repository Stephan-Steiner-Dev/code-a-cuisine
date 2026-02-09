import { Component, inject } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { DataService } from '../shared/service/data.service';
import { CommonModule } from '@angular/common';
import { Directions } from '../selected-recipe/directions/directions';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { DishTitle } from './dish-title/dish-title';


/**
 * SelectedRecipeComponent
 *
 * Displays the details for the currently selected recipe, including:
 * - Dish title/header (DishTitle component)
 * - Step-by-step directions (Directions component)
 * - Buttons/actions (ButtonComponent)
 *
 * The currently selected recipe is retrieved from IngredientService using the
 * current recipe index. Navigation to other routes is handled via Angular Router.
 */
@Component({
  selector: 'app-selected-recipe',
  imports: [CommonModule, Directions, ButtonComponent, DishTitle],
  templateUrl: './selected-recipe.component.html',
  styleUrls: ['./selected-recipe.component.scss', './selected-recipe.mobile.scss']
})
export class SelectedRecipeComponent {

  /** Provides access to recipes and the selected recipe index (injected). */
  public ingredientService = inject(IngredientService);

  /** Shared application data service (injected). */
  public dataService = inject(DataService);

  /**
   * Reference to the currently selected recipe.
   * Resolved from IngredientService at component initialization time.
   */
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe];

  /** Angular Router used for navigation (injected). */
  private router = inject(Router);

  /**
   * Navigates to the provided route target.
   *
   * @param target Route path to navigate to
   */
  navigate(target: string) {
    this.router.navigate([target]);
  }
}