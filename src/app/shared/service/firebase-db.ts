import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Database, listVal, objectVal } from '@angular/fire/database';
import { ref, query, orderByChild, limitToLast } from 'firebase/database';
import { combineLatest, map, Observable, take } from 'rxjs';

export interface RecipeLite {
  id: string;
  title?: string;
  likes: number;
  cookingtime?: string;
  cuisine: string;
}

export interface Recipe {
  id: string;
  title?: string;
  likes: number;
  cookingtime?: string;
  cuisine: string;
  diet: string;
  extraIngredients: string[];
  myIngredients: string[];
  nutritionalInformations: string[];
  persons: number;
  steps: string[];
}

@Injectable({ providedIn: 'root' })
export class FirebaseDbService {
  constructor(private db: Database) {}

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private ssrOnce<T>(source$: Observable<T>): Observable<T> {
    return this.isBrowser ? source$ : source$.pipe(take(1));
  }

  public currentCuisineRecipes: Recipe[] = [];
  public currentCuisine: string = '';

  getCuisine$(cuisine: string): Observable<Recipe[]> {
    const cuisineRef = ref(this.db, `/${cuisine}`);

    return this.ssrOnce(
      listVal<Recipe>(cuisineRef, { keyField: 'id' }).pipe(
        map(arr => arr ?? [])
      )
    );
  }

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

  getWebhookRecipes$(cuisine: string): Observable<Recipe[]> {
    const cuisineRef = ref(this.db, `/${cuisine}`);
    const q = query(cuisineRef, orderByChild('timestamp'), limitToLast(3));

    return this.ssrOnce(
      listVal<Recipe>(q, { keyField: 'id' }).pipe(
        map(arr => (arr ?? []).reverse())
      )
    );
  }

  getRecipe$(cuisine: string, id: string): Observable<Recipe | null> {
    const recipeRef = ref(this.db, `/${cuisine}/${id}`);

    return this.ssrOnce(
      objectVal<Recipe>(recipeRef, { keyField: 'id' }).pipe(
        map(val => val ?? null)
      )
    );
  }
}