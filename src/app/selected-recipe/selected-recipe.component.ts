import { Component, inject } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-selected-recipe',
  imports: [],
  templateUrl: './selected-recipe.component.html',
  styleUrl: './selected-recipe.component.scss',
})
export class SelectedRecipeComponent {
  public ingredientService= inject(IngredientService)
  public dataService = inject(DataService)

}
