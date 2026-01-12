import { Component, inject } from '@angular/core';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { IngredientService } from '../shared/service/ingredient.service';

@Component({
  selector: 'app-cuisine-collection',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cuisine-collection.html',
  styleUrls: ['./cuisine-collection.scss', './cuisine-collection.mobile.scss']
})

export class CuisineCollection {
  public firebaseDB = inject(FirebaseDbService)
  public dataService = inject(DataService)
  private router = inject(Router)
  private ingredientService = inject(IngredientService)

  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipes = this.firebaseDB.currentCuisineRecipes;
  }

  navigate(target: string) {
    this.router.navigate([target])
  }

  navigateToRecipe(recipe: any){
    this.ingredientService.currentRecipe = 0;
    this.ingredientService.recipes[0] = recipe;
    this.router.navigate(['/selected-recipe']) 
  }
}
