import { Component } from '@angular/core';
import { IngredientService } from '../shared/service/ingredient.service';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss', './recipes.mobile.scss']
})
export class RecipesComponent {
  constructor(public ingredientService: IngredientService, public dataService: DataService, private router: Router) { }

  navigateToIngredients() {
    this.router.navigate(['./select-ingredients'])
  }
}
