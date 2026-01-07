import { Injectable } from '@angular/core';
import { Database, objectVal, listVal } from '@angular/fire/database';
import { ref, query, orderByChild, limitToLast } from 'firebase/database';
import { combineLatest, map, Observable } from 'rxjs';

export interface RecipeLite {
  id: string;        // <- Firebase Key
  title?: string;
  likes?: number;
  cookingtime?: string;
  cuisine: string;
}

export interface Recipe {
  id: string;        // <- Firebase Key
  title?: string;
  likes?: number;
  cookingtime?: string;
  cuisine: string;
  diet: string;
  extraIngredients: string[];
  myIngredients: string[];
  nutrutionalInformations: string[];
  persons: number;
  steps: string[];
}

@Injectable({ providedIn: 'root' })
export class FirebaseDbService {
  constructor(private db: Database) { }

  public currentCuisineRecipes: Recipe[] = [];



getCuisine$(cuisine: string): Observable<Recipe[]> {
  const cuisineRef = ref(this.db, `/${cuisine}`);

  return listVal<Recipe>(cuisineRef, { keyField: 'id' }).pipe(
    map(arr => arr ?? [])
  );
}






  // getCuisine$(cuisine: string): Observable<Recipe | null> {
  //   return objectVal<Recipe>(ref(this.db, `/${cuisine}`));
  // }

  getTopRecipeByCuisine$(cuisine: string): Observable<RecipeLite | null> {
    const cuisineRef = ref(this.db, `/${cuisine}`);
    const q = query(cuisineRef, orderByChild('likes'), limitToLast(1));

    return listVal<any>(q, { keyField: 'id' }).pipe(
      map((arr) => {
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
    );
  }

  getTopRecipesAllCuisines$(): Observable<Record<string, RecipeLite | null>> {
    const cuisines = [
      'German',
      'Italian',
      'Oriental',
      'Japanese',
      'Fusion',
      'Anti-inflammatory',
    ];

    return combineLatest(
      cuisines.map(cuisine =>
        this.getTopRecipeByCuisine$(cuisine).pipe(
          map(recipe => ({ cuisine, recipe }))
        )
      )
    ).pipe(
      map(results => {
        const obj: Record<string, RecipeLite | null> = {};
        results.forEach(r => {
          obj[r.cuisine] = r.recipe;
        });
        return obj;
      })
    );
  }

}