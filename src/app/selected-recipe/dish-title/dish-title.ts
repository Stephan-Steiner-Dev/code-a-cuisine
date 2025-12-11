import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';

@Component({
  selector: 'app-dish-title',
  imports: [],
  templateUrl: './dish-title.html',
  styleUrls: ['./dish-title.scss', './dish-title.mobile.scss']
})
export class DishTitle {
 public dataService = inject(DataService)
 public ingredientService = inject(IngredientService)
 public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe]
}
