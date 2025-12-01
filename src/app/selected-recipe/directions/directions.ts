import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';

@Component({
  selector: 'app-directions',
  imports: [],
  templateUrl: './directions.html',
  styleUrl: './directions.scss',
})
export class Directions {
  public dataService = inject(DataService)
  public ingredientService = inject(IngredientService)
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe]

like() {
  console.log('test')
}
}


