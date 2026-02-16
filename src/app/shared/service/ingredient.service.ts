import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirebaseDbService } from './firebase-db';
import { take } from 'rxjs';

/**
 * Ingredient
 *
 * Represents a single ingredient entry provided by the user.
 */
export interface Ingredient {
  /** Ingredient name (e.g., "Tomato"). */
  ingredient: string;

  /** Quantity amount for the ingredient. */
  amount: number;

  /** Unit for the quantity (e.g., "g", "ml", "pcs"). */
  selectedUnit: string;
}

/**
 * Preferences
 *
 * Represents the user's recipe preferences and serving configuration.
 */
export interface Preferences {
  /** Selected cooking time preference(s). */
  cookingTime: string[];

  /** Selected cuisine preference(s). */
  cuisine: string[];

  /** Selected diet preference(s). */
  diet: string[];

  /** Desired number of portions. */
  portions: number;

  /** Number of persons/participants. */
  persons: number
}

/**
 * Recipe
 *
 * Recipe shape used in the ingredient flow (webhook response and app storage).
 */
export interface Recipe {
  /** Recipe title (optional). */
  title?: string;

  /** Nutrition strings as provided by the backend (format depends on data source). */
  nutritionalInformations: string[];

  /** Ingredients provided by the user / matched ingredients. */
  myIngredients: string[];

  /** Additional ingredients beyond the user's provided ingredients. */
  extraIngredients: string[];

  /** Step-by-step cooking instructions. */
  steps: string[];

  /** Cooking time descriptor (optional). */
  cookingtime?: string;

  /** Cuisine category under which the recipe is stored. */
  cuisine: string;

  /** Number of persons the recipe is intended for. */
  persons: number;

  /** Diet tag/label for the recipe. */
  diet: string;

  /** Like count (optional, may be added by database layer). */
  likes?: number;

  /** Recipe id (typically the database key). */
  id: string
}

/**
 * IngredientService
 *
 * Central service for the ingredient-to-recipe flow:
 * - Stores the user's ingredient list and preferences locally
 * - Submits them to a webhook endpoint to trigger recipe generation
 * - Retrieves the latest generated recipes from Firebase based on cuisine
 * - Navigates between loading/results pages during the flow
 */
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  /** Angular HttpClient used to call the webhook endpoint (injected). */
  private http = inject(HttpClient);

  /** Angular Router used for navigation within the flow (injected). */
  private router = inject(Router);

  /** Webhook endpoint used to submit ingredients and preferences. */
  private webhookUrl = '/webhook-test/ingredient';

  /** Current list of ingredients entered by the user. */
  public ingredientList: Ingredient[] = [];

  /** Current list of preferences selected by the user. */
  public preferenceList: Preferences[] = [];

  /** Index of the currently selected recipe in `recipes`. */
  public currentRecipe: number = 0;

  /** Firebase database service used to fetch generated recipes (injected). */
  public firebaseDB = inject(FirebaseDbService);

  /** Recipes loaded for the results page. */
  public recipes: Recipe[] = [];

  /**
   * Returns the current ingredient list.
   *
   * @returns Ingredient[] the stored ingredient entries
   */
  getIngredients(): Ingredient[] {
    return this.ingredientList;
  }

  /**
   * Adds an ingredient entry to the list.
   *
   * @param item Ingredient entry to add
   */
  addIngredient(item: Ingredient): void {
    this.ingredientList.push(item);
  }

  /**
   * Deletes an ingredient entry by index.
   *
   * @param index Index of the ingredient to remove
   */
  deleteIngredient(index: number): void {
    this.ingredientList.splice(index, 1);
  }

  /**
   * Resets ingredient and preference arrays back to empty.
   * Used after submitting and after recipes are loaded.
   */
  resetArray() {
    this.ingredientList = [];
    this.preferenceList = [];
  }

  /**
   * Submits the current ingredients and preferences to the webhook endpoint.
   *
   * Flow:
   * 1. Navigates to the loading page
   * 2. Posts the payload to the webhook
   * 3. Extracts cuisine from the webhook response
   * 4. If cuisine is missing:
   *    - clears recipes, resets arrays, navigates to '/recipes'
   * 5. If cuisine exists:
   *    - fetches the latest 3 webhook recipes for that cuisine from Firebase
   *    - stores them in `recipes`, resets arrays, navigates to '/recipes'
   */
  submitData() {
    this.router.navigate(['/loading-page']);

    const payload = {
      ingredients: this.ingredientList,
      preferences: this.preferenceList
    };

    this.http.post<Recipe[]>(this.webhookUrl, payload, {
      headers: {
        'x-client-ip': '203.0.113.25'
      }
    }).subscribe({
      next: (response) => {
        const cuisine = response?.[0]?.cuisine;
        if (!cuisine) {
          this.recipes = [];
          this.resetArray();
          this.router.navigate(['/recipes']);
          return;
        }

        this.firebaseDB.getWebhookRecipes$(cuisine)
          .pipe(take(1))
          .subscribe(dbRecipes => {
            this.recipes = dbRecipes;
            this.resetArray();
            this.router.navigate(['/recipes']);
          });
      },
      error: (error) => {
        const message =
          error?.error?.message ||
          'Ein unbekannter Fehler ist aufgetreten.';
        alert(message);
        this.recipes = [];
        this.resetArray();
        setTimeout(() => {
          this.router.navigate(['/landingpage']);
        }, 3000);
      }
    });
  }
}