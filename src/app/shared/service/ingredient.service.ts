import { Injectable, inject } from '@angular/core';
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
  nutritionalInformations: string[];
  myIngredients: string[];
  extraIngredients: string[];
  steps: string[];
  cookingtime: string;
  cuisine: string;
  persons: number;
  diet: string
}

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

    private http = inject(HttpClient)
    private router= inject(Router)

  private webhookUrl = '/webhook-test/ingredient';
  public ingredientList: Ingredient[] = [];
  public preferenceList: Preferences[] = [];
  public currentRecipe: number = 0;

  public recipes: Recipe[] = [
  {
    "title": "Pasta al Pomodoro e Burro (Tomato Butter Pasta)",
    "nutritionalInformations": [
      "1530 kcal",
      "36 g",
      "88 g",
      "148 g"
    ],
    "myIngredients": [
      "200 gram pasta",
      "100 gram Butter",
      "2 piece tomatoes"
    ],
    "extraIngredients": [
      "2 cloves garlic",
      "50 gram Parmesan cheese",
      "Fresh basil"
    ],
    "steps": [
      "Cook pasta according to package instructions until al dente. Reserve about 1 cup of pasta water before draining.",
      "While pasta cooks, finely chop the garlic and dice the tomatoes.",
      "In a large pan, melt half of the butter over medium heat. Add garlic and cook until fragrant (about 1 minute).",
      "Add diced tomatoes to the pan and cook for 5-7 minutes, stirring occasionally, until they start to break down and form a sauce.",
      "Add the drained pasta to the pan with the tomato sauce. Add the remaining butter and about 1/2 cup of reserved pasta water.",
      "Toss continuously until the butter has melted and emulsified with the pasta water to create a creamy sauce that coats the pasta. Add more pasta water if needed to reach desired consistency.",
      "Stir in grated Parmesan cheese and fresh basil. Serve immediately."
    ],
    "cookingtime": "20 mins",
    "cuisine": "German",
    "persons": 2,
    "diet": "No preferences"
  },
  {
    "title": "Buttered Noodles with Roasted Tomatoes and Herbs",
    "nutritionalInformations": [
      "Energy: 1550 kcal",
      "Protein: 32 g",
      "Fat: 84 g",
      "Carbs: 168 g"
    ],
    "myIngredients": [
      "200 gram pasta",
      "100 gram Butter",
      "2 piece tomatoes"
    ],
    "extraIngredients": [
      "1 small onion",
      "Fresh chives",
      "2 tablespoons breadcrumbs"
    ],
    "steps": [
      "Preheat oven to 200°C (390°F). Halve the tomatoes, drizzle with a little olive oil (not included in ingredients but common), salt, and pepper, then roast for 15-20 minutes until slightly softened and caramelized.",
      "Meanwhile, cook pasta according to package instructions until al dente. Drain well.",
      "Finely chop the onion and fresh chives.",
      "In a large pan, melt most of the butter over medium heat. Add the chopped onion and cook until translucent (about 3-5 minutes).",
      "Add the drained pasta to the pan with the melted butter and onions. Toss well to coat the noodles evenly.",
      "In a separate small pan, melt the remaining butter. Add breadcrumbs and toast until golden brown and crispy.",
      "Serve the buttered noodles topped with the roasted tomatoes, toasted breadcrumbs, and fresh chives."
    ],
    "cookingtime": "25 mins",
    "cuisine": "German",
    "persons": 3,
    "diet": "No preferences"
  },
  {
    "title": "Lemon Herb Butter Pasta with Fresh Tomatoes",
    "nutritionalInformations": [
      "Energy: 1450 kcal",
      "Protein: 29 g",
      "Fat: 83 g",
      "Carbs: 148 g"
    ],
    "myIngredients": [
      "200 gram pasta",
      "100 gram Butter",
      "2 piece tomatoes"
    ],
    "extraIngredients": [
      "Lemon zest",
      "Fresh parsley",
      "Pinch of chili flakes"
    ],
    "steps": [
      "Cook pasta according to package instructions until al dente. Reserve about 1/2 cup of pasta water before draining.",
      "While pasta cooks, finely chop the tomatoes and fresh parsley. Grate the zest from half a lemon.",
      "In a large pan or pot (the one you'll serve from), melt the butter over low-medium heat.",
      "Add the drained pasta to the pan. Add the lemon zest and chili flakes, if using.",
      "Pour in about 1/4 cup of the reserved pasta water. Stir vigorously to create a light, emulsified sauce that coats the pasta.",
      "Add the chopped fresh tomatoes and parsley. Toss gently to combine, allowing the heat to slightly warm the tomatoes without fully cooking them.",
      "Taste and adjust seasoning. Serve immediately."
    ],
    "cookingtime": "18 mins",
    "cuisine": "German",
    "persons": 2,
    "diet": "No preferences"
  }
]









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
