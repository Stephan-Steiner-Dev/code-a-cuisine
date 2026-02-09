import { Component, inject } from '@angular/core';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { IngredientService } from '../shared/service/ingredient.service';

/**
 * CuisineCollection component
 *
 * Displays a collection of recipes for the currently selected cuisine.
 * Recipes are retrieved from FirebaseDbService and rendered in the view.
 *
 * Users can:
 * - Navigate to other routes
 * - Open a selected recipe, which is stored in IngredientService
 *   before navigating to the recipe detail page.
 */
@Component({
  selector: 'app-cuisine-collection',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cuisine-collection.html',
  styleUrls: ['./cuisine-collection.scss', './cuisine-collection.mobile.scss']
})
export class CuisineCollection {

  /** Firebase database service providing cuisine recipe data (injected). */
  public firebaseDB = inject(FirebaseDbService);

  /** Shared application data service (injected). */
  public dataService = inject(DataService);

  /** Angular router used for navigation (injected). */
  private router = inject(Router);

  /**
   * IngredientService is used here as a shared store
   * to pass the selected recipe to the recipe view.
   */
  private ingredientService = inject(IngredientService);

  /** List of recipes belonging to the selected cuisine. */
  recipes: Recipe[] = [];

  /**
   * Angular lifecycle hook.
   * Loads recipes for the currently active cuisine from FirebaseDbService.
   */
  ngOnInit() {
    this.recipes = this.firebaseDB.currentCuisineRecipes;
  }

  /**
   * Navigates to the provided route target.
   *
   * @param target Route path to navigate to
   */
  navigate(target: string) {
    this.router.navigate([target]);
  }

  /**
   * Opens the selected recipe:
   * - Sets the current recipe index to 0
   * - Stores the recipe in IngredientService
   * - Navigates to the recipe detail page
   *
   * @param recipe Selected recipe object
   */
  navigateToRecipe(recipe: any){
    this.ingredientService.currentRecipe = 0;
    this.ingredientService.recipes[0] = recipe;
    this.router.navigate(['/selected-recipe']);
  }
}

