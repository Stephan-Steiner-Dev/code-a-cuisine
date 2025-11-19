import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  title: string;
  ingredients: string[];
  steps: string[];
}

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private webhookUrl = '/webhook-test/ingredient';
  public ingredientList: Ingredient[] = [];
  public preferenceList: Preferences[] = [];
  public recipes: Recipe[] = [];

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

    console.log('Sende an n8n:', payload);

    this.http.post<Recipe[]>(this.webhookUrl, payload).subscribe({
      next: (response) => {
        this.recipes = response;
        console.log(this.recipes)

        this.resetArray();
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error('Webhook Fehler:', error);
      }
    });
  }
}
