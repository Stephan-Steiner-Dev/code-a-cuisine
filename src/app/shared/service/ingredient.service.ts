import { Injectable } from '@angular/core';

export interface Ingredient {
  ingredient: string;
  amount: number;
  selectedUnit: string;
}

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  public ingredientList: Ingredient[] = [];

  getIngredients(): Ingredient[] {
    return this.ingredientList;
  }

  addIngredient(item: Ingredient): void {
    this.ingredientList.push(item);
  }

  deleteIngredient(index: number): void {
    this.ingredientList.splice(index, 1);
  }
}
