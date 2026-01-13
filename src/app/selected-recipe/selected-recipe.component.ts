import { Component, inject } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { DataService } from '../shared/service/data.service';
import { CommonModule } from '@angular/common';
import { Directions } from '../selected-recipe/directions/directions';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { DishTitle } from './dish-title/dish-title';


@Component({
  selector: 'app-selected-recipe',
  imports: [CommonModule, Directions, ButtonComponent, DishTitle],
  templateUrl: './selected-recipe.component.html',
  styleUrls: ['./selected-recipe.component.scss', './selected-recipe.mobile.scss']
})
export class SelectedRecipeComponent {
  public ingredientService= inject(IngredientService)
  public dataService = inject(DataService)
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe]
  private router = inject(Router)

navigate(target: string){
  this.router.navigate([target])
}
}