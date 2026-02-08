import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FirebaseDbService } from './firebase-db';
import { take } from 'rxjs';

export interface Ingredient {
  ingredient: string;
  amount: number;
  selectedUnit: string;
}

export interface Preferences {
  cookingTime: string[];
  cuisine: string[];
  diet: string[];
  portions: number;
  persons: number
}

export interface Recipe {
  title?: string;
  nutritionalInformations: string[];
  myIngredients: string[];
  extraIngredients: string[];
  steps: string[];
  cookingtime?: string;
  cuisine: string;
  persons: number;
  diet: string;
  likes?: number;
  id: string
}

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  private http = inject(HttpClient)
  private router = inject(Router)
  private webhookUrl = '/webhook-test/ingredient';
  public ingredientList: Ingredient[] = [];
  public preferenceList: Preferences[] = [];
  public currentRecipe: number = 0;
  public firebaseDB = inject(FirebaseDbService)
  public recipes: Recipe[] = []

  getIngredients(): Ingredient[] {
    return this.ingredientList;
  }

  addIngredient(item: Ingredient): void {
    this.ingredientList.push(item);
  }

  deleteIngredient(index: number): void {
    this.ingredientList.splice(index, 1);
  }

  resetArray() {
    this.ingredientList = []
    this.preferenceList = []
  }

  submitData() {
    this.router.navigate(['/loading-page']);

    const payload = {
      ingredients: this.ingredientList,
      preferences: this.preferenceList
    };

    this.http.post<Recipe[]>(this.webhookUrl, payload).subscribe({
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
      error: (error) => console.error('Webhook Fehler:', error)
    });
  }

}