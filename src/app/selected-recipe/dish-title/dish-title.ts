import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';
import { CommonModule } from '@angular/common';

/**
 * DishTitle component
 *
 * Displays the title (and potentially related header information)
 * for the currently selected recipe.
 *
 * The recipe is retrieved from IngredientService using the
 * current recipe index.
 */
@Component({
  selector: 'app-dish-title',
  imports: [CommonModule],
  templateUrl: './dish-title.html',
  styleUrls: ['./dish-title.scss', './dish-title.mobile.scss']
})
export class DishTitle {

  /** Shared application data service (injected). */
  public dataService = inject(DataService);

  /** Service holding recipes and the selected recipe index (injected). */
  public ingredientService = inject(IngredientService);

  /**
   * Reference to the currently selected recipe.
   * It is resolved using the index stored in IngredientService.
   */
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe];
}
