import { Component } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  constructor(public ingredientService: IngredientService) { }
}
