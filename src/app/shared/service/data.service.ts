import { Injectable } from '@angular/core';

export type PreferenceKey = 'cookingTime' | 'cuisine' | 'dietPreferences';

export interface PreferenceSection {
  key: PreferenceKey;
  headline: string;
  image: string;
  target: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  preferenceData: {
    sections: PreferenceSection[];
    cookingTime: string[];
    cuisine: string[];
    dietPreferences: string[];
  } = {
      sections: [
        { key: 'cookingTime', headline: 'Cooking time:', image: 'assets/images/preferences/clock.png', target: 'selectedCookingTimes' },
        { key: 'cuisine', headline: 'Cuisine', image: 'assets/images/preferences/world.png', target: 'selectedCuisines' },
        { key: 'dietPreferences', headline: 'Diet Preferences', image: 'assets/images/preferences/fork_spoon.png', target: 'selectedDiets' }
      ],
      cookingTime: ['Quick', 'Medium', 'Complex'],
      cuisine: ['German', 'Italian', 'Oriental', 'Japanese', 'Anti-inflammatory', 'Fusion'],
      dietPreferences: ['Vegetarian', 'Vegan', 'Keto', 'No preferences']
    };

  recipeResults: {
    title: string,
    image: string,
    description: string,

  } = {
      title: 'The recipe results',
      image: '/assets/images/recipe/recipe-image.png',
      description: 'We took what you have and let our AI do the thinking. Here are 3 easy recipes you can make right now!'
    }
}

