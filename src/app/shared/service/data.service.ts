import { Injectable } from "@angular/core";

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
      description: 'We took what you have and let our AI do the thinking. Here are 3 easy recipes you can make right now!',
    }

  selectedRecipe: {
    titleSection: string[]
    directions: string
    inspiration: string
    heartIcon: string
  } = {
      titleSection: [
        'Energie', 'Protein', 'Fat', 'Carbs'
      ],
      directions: 'Find inspiration for your next culinary adventure!',
      inspiration: '<strong>Just finished this Meal?</strong> Give it a heart, so that the others know this is delicious.',
      heartIcon: 'assets/shared-icons/heart.png'
    }

  cookbook: {
    title: string
    description: string
    subtitle: string
    cuisine: string[]
    images: string[]
    icons: string[]
  } = {
      title: 'Cookbook',
      description: 'From quick bites to gourmet delights, explore them all in our ultimate cookbook and get inspired for your next culinary adventure.',
      subtitle: 'Most liked recipes',
      cuisine: ['Italian', 'German', 'Oriental', 'Japanese', 'Anti-inflammatory', 'Fusion'],
      images: [
        '/assets/images/cookbook/italian.png',
        '/assets/images/cookbook/german.png',
        '/assets/images/cookbook/oriental.png',
        '/assets/images/cookbook/japanese.png',
        '/assets/images/cookbook/anti-inflammatory.jpg',
        '/assets/images/cookbook/fusion.png'
      ],
      icons: ['/assets/shared-icons/heart.png', 'assets/images/preferences/clock.png', 'assets/images/cookbook/favorite.png', 'assets/shared-icons/arrow.png']
    }

  cookbookCollection: {
    images: Record<string, string>;
    imagesMobile: Record<string, string>;
  } = {
      images: {
        'Anti-inflammatory': '/assets/images/cuisine-collection/anti-inflammatory.png',
        Italian: '/assets/images/cuisine-collection/italian.png',
        German: '/assets/images/cuisine-collection/german.png',
        Fusion: '/assets/images/cuisine-collection/fusion.png',
        Japanese: '/assets/images/cuisine-collection/japanese.png',
        Oriental: '/assets/images/cuisine-collection/oriental.png',
      },
      imagesMobile: {
        'Anti-inflammatory': '/assets/images/cuisine-collection/anti-inflammatory-mobile.png',
        Italian: '/assets/images/cuisine-collection/italian-mobile.png',
        German: '/assets/images/cuisine-collection/german-mobile.png',
        Fusion: '/assets/images/cuisine-collection/fusion-mobile.png',
        Japanese: '/assets/images/cuisine-collection/japanese-mobile.png',
        Oriental: '/assets/images/cuisine-collection/oriental-mobile.png',
      },
    };
}