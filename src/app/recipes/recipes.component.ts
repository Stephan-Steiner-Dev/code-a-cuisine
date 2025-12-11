import { Component, inject } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipes',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss', './recipes.mobile.scss']
})
export class RecipesComponent {
  private router = inject(Router);
  public ingredientService = inject(IngredientService);
  public dataService = inject(DataService);

  constructor() { }

  navigateToIngredients() {
    this.router.navigate(['./select-ingredients'])
  }

  navigateToSelectedRecipe(i: number) {
    this.ingredientService.currentRecipe = i;
    this.router.navigate(['./selected-recipe'])
  }
}
