import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeLite } from '../shared/service/firebase-db';
import { IngredientService } from '../shared/service/ingredient.service';

/**
 * Cookbook component
 *
 * Provides the cookbook overview and navigation for browsing recipes:
 * - Allows selecting a cuisine and loading all recipes for that cuisine
 * - Exposes observables for "top recipes" across all cuisines and per cuisine
 * - Fetches and displays a specific recipe by id and cuisine
 *
 * Data is retrieved via FirebaseDbService and navigation is handled via Router.
 * The selected recipe is stored in IngredientService for the recipe detail view.
 */
@Component({
  selector: 'app-cookbook',
  imports: [CommonModule],
  templateUrl: './cookbook.html',
  styleUrls: ['./cookbook.scss', './cookbook.mobile.scss']
})
export class Cookbook {
  /**
   * Uses Angular Location for back navigation.
   *
   * @param location Angular Location service (injected via constructor)
   */
  constructor(private location: Location) { }

  /** Shared application data service (injected). */
  public dataService = inject(DataService);

  /** Firebase database service for cuisines/recipes (injected). */
  public firebaseDB = inject(FirebaseDbService);

  /** Observable that can represent a cuisine payload; assigned elsewhere in the view logic. */
  public cuisine$!: Observable<any | null>;

  /** Angular Router for navigation (injected). */
  private router = inject(Router);

  /** Observable holding the top recipe for a selected cuisine. */
  public topRecipe$!: Observable<RecipeLite | null>;

  /** Observable providing top recipes across all cuisines (from FirebaseDbService). */
  public topByCuisine$ = this.firebaseDB.getTopRecipesAllCuisines$();

  /**
   * IngredientService is used as a shared store to pass the selected recipe
   * to the selected-recipe view/component.
   */
  public ingredientService = inject(IngredientService);

  /**
   * Loads all recipes for a cuisine and navigates to the cuisine collection page.
   * Side effects:
   * - Sets `firebaseDB.currentCuisine`
   * - Fetches recipes once (`take(1)`)
   * - Stores them into `firebaseDB.currentCuisineRecipes`
   *
   * @param cuisine Cuisine identifier/name
   */
  getRecipes(cuisine: string) {
    this.firebaseDB.currentCuisine = cuisine;
    this.firebaseDB.getCuisine$(cuisine)
      .pipe(take(1))
      .subscribe((recipes: Recipe[]) => {
        this.firebaseDB.currentCuisineRecipes = recipes;
        this.router.navigate(['/cuisine-collection']);
      });
  }

  /**
   * Generic navigation helper.
   * - If target is 'back', navigates one step back using Location.
   * - Otherwise navigates to the given route.
   *
   * @param target Route path or the special string 'back'
   */
  navigate(target: string) {
    if (target === 'back') {
      this.location.back();
      return;
    } else {
      this.router.navigate([target]);
    }
  }

  /**
   * Sets `topRecipe$` to an observable of the top recipe for the given cuisine.
   * Intended to be used to drive UI (e.g., preview cards).
   *
   * @param cuisine Cuisine identifier/name
   */
  getTopRecipe(cuisine: string) {
    this.topRecipe$ = this.firebaseDB.getTopRecipeByCuisine$(cuisine);
  }

  /**
   * Loads a recipe by id and cuisine and then navigates to the recipe detail page.
   * Side effects:
   * - Fetches recipe once (`take(1)`)
   * - Navigates to '/selected-recipe'
   * - Stores recipe into IngredientService at index 0 and sets currentRecipe to 0
   *
   * @param id     Recipe document id
   * @param cuisine Cuisine identifier/name
   */
  async showRecipe(id: string, cuisine: string) {
    this.firebaseDB.getRecipe$(cuisine, id)
      .pipe(take(1))
      .subscribe(recipe => {
        if (!recipe) return;
        this.router.navigate(['/selected-recipe']);
        this.ingredientService.currentRecipe = 0;
        this.ingredientService.recipes[0] = recipe;
      });
  }
}