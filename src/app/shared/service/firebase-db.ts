import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Database, listVal, objectVal } from '@angular/fire/database';
import { ref, query, orderByChild, limitToLast } from 'firebase/database';
import { combineLatest, map, Observable, take } from 'rxjs';

/**
 * RecipeLite
 *
 * Lightweight recipe model used for list/previews (e.g., "top recipe" cards).
 * Contains only the fields needed for summary displays.
 */
export interface RecipeLite {
  /** Firebase key / recipe id. */
  id: string;

  /** Display title of the recipe (optional). */
  title?: string;

  /** Like count for ranking and display. */
  likes: number;

  /** Cooking time descriptor (optional). */
  cookingtime?: string;

  /** Cuisine category under which the recipe is stored. */
  cuisine: string;
}

/**
 * Recipe
 *
 * Full recipe model used for recipe detail views.
 */
export interface Recipe {
  /** Firebase key / recipe id. */
  id: string;

  /** Display title of the recipe (optional). */
  title?: string;

  /** Like count for ranking and display. */
  likes: number;

  /** Cooking time descriptor (optional). */
  cookingtime?: string;

  /** Cuisine category under which the recipe is stored. */
  cuisine: string;

  /** Diet tag/label for the recipe. */
  diet: string;

  /** Additional ingredients beyond the user's provided ingredients. */
  extraIngredients: string[];

  /** Ingredients provided by the user / matched ingredients. */
  myIngredients: string[];

  /** Nutrition strings as provided by the backend (format depends on data source). */
  nutritionalInformations: string[];

  /** Number of persons the recipe is intended for. */
  persons: number;

  /** Step-by-step cooking instructions. */
  steps: string[];
}

/**
 * FirebaseDbService
 *
 * Wrapper around AngularFire Realtime Database access for recipes.
 * Provides methods to:
 * - Load all recipes for a cuisine
 * - Load the most-liked recipe per cuisine
 * - Load top recipes across all cuisines
 * - Load the latest webhook-generated recipes (last 3 by timestamp)
 * - Load a single recipe by id
 *
 * SSR note:
 * - When not running in the browser (SSR), `ssrOnce` limits observables to a single emission
 *   to avoid subscriptions that never complete on the server.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseDbService {
  constructor(private db: Database) {}

  /** True if code is executing in the browser (not on the server). */
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /**
   * Ensures server-side rendering (SSR) streams complete by taking only one value.
   * In the browser, the observable is returned as-is.
   *
   * @param source$ Observable stream to optionally limit during SSR
   */
  private ssrOnce<T>(source$: Observable<T>): Observable<T> {
    return this.isBrowser ? source$ : source$.pipe(take(1));
  }

  /**
   * Cached list of recipes for the currently selected cuisine,
   * used by components that navigate to a cuisine collection view.
   */
  public currentCuisineRecipes: Recipe[] = [];

  /** Name of the currently selected cuisine. */
  public currentCuisine: string = '';

  /**
   * Fetches all recipes for a given cuisine.
   * The returned objects include the Firebase key mapped into the `id` field.
   *
   * @param cuisine Cuisine node name in the database (e.g., "Italian")
   * @returns Observable of Recipe array (empty array if none)
   */
  getCuisine$(cuisine: string): Observable<Recipe[]> {
    const cuisineRef = ref(this.db, `/${cuisine}`);

    return this.ssrOnce(
      listVal<Recipe>(cuisineRef, { keyField: 'id' }).pipe(
        map(arr => arr ?? [])
      )
    );
  }

  /**
   * Fetches the most-liked recipe for a given cuisine.
   * Queries by `likes` and returns the last item (highest likes) using limitToLast(1).
   *
   * @param cuisine Cuisine node name in the database
   * @returns Observable of RecipeLite or null if no recipe exists
   */
  getTopRecipeByCuisine$(cuisine: string): Observable<RecipeLite | null> {
    const cuisineRef = ref(this.db, `/${cuisine}`);
    const q = query(cuisineRef, orderByChild('likes'), limitToLast(1));

    return this.ssrOnce(
      listVal<any>(q, { keyField: 'id' }).pipe(
        map(arr => {
          if (!arr || arr.length === 0) return null;
          const r = arr[0];
          return {
            id: r.id,
            title: r.title,
            likes: Number(r.likes ?? 0),
            cookingtime: r.cookingtime,
            cuisine,
          } as RecipeLite;
        })
      )
    );
  }

  /**
   * Fetches the top recipe for each cuisine in a predefined cuisine list.
   * Produces an object mapping cuisine name -> RecipeLite (or null if none exists).
   *
   * @returns Observable of record keyed by cuisine
   */
  getTopRecipesAllCuisines$(): Observable<Record<string, RecipeLite | null>> {
    const cuisines = ['German', 'Italian', 'Oriental', 'Japanese', 'Fusion', 'Anti-inflammatory'];

    return this.ssrOnce(
      combineLatest(
        cuisines.map(cuisine =>
          this.getTopRecipeByCuisine$(cuisine).pipe(
            map(recipe => ({ cuisine, recipe }))
          )
        )
      ).pipe(
        map(results => {
          const obj: Record<string, RecipeLite | null> = {};
          results.forEach(r => (obj[r.cuisine] = r.recipe));
          return obj;
        })
      )
    );
  }

  /**
   * Fetches the last 3 recipes (by `timestamp`) for a cuisine and returns them in newest-first order.
   * Intended for recipes created/updated via webhook processes.
   *
   * @param cuisine Cuisine node name in the database
   * @returns Observable of up to 3 recipes, ordered newest-first
   */
  getWebhookRecipes$(cuisine: string): Observable<Recipe[]> {
    const cuisineRef = ref(this.db, `/${cuisine}`);
    const q = query(cuisineRef, orderByChild('timestamp'), limitToLast(3));

    return this.ssrOnce(
      listVal<Recipe>(q, { keyField: 'id' }).pipe(
        map(arr => (arr ?? []).reverse())
      )
    );
  }

  /**
   * Fetches a single recipe by cuisine and recipe id.
   * The returned object includes the Firebase key mapped into the `id` field.
   *
   * @param cuisine Cuisine node name in the database
   * @param id Recipe id (Firebase key)
   * @returns Observable of Recipe or null if not found
   */
  getRecipe$(cuisine: string, id: string): Observable<Recipe | null> {
    const recipeRef = ref(this.db, `/${cuisine}/${id}`);

    return this.ssrOnce(
      objectVal<Recipe>(recipeRef, { keyField: 'id' }).pipe(
        map(val => val ?? null)
      )
    );
  }
}