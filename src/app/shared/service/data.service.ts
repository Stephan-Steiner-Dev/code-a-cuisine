import { Injectable } from "@angular/core";

/**
 * PreferenceKey
 *
 * Union type defining the supported preference categories used throughout the app.
 */
export type PreferenceKey = 'cookingTime' | 'cuisine' | 'dietPreferences';

/**
 * PreferenceSection
 *
 * Describes a preference section shown in the UI.
 * - `key`: Identifies which preference category the section belongs to
 * - `headline`: UI headline for the section
 * - `image`: Path to the icon/image used in the UI
 * - `target`: Name of the component property that stores the selected values
 */
export interface PreferenceSection {
  key: PreferenceKey;
  headline: string;
  image: string;
  target: string;
}

/**
 * DataService
 *
 * Central place for static UI text and configuration data used across the application.
 * This includes:
 * - Preferences UI metadata and available options
 * - Recipe results page content
 * - Selected recipe page text and icons
 * - Cookbook page content (cuisines, images, icons)
 * - Cuisine collection header images (desktop and mobile)
 *
 * The service is provided in the root injector, making it a singleton across the app.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * Configuration and options for the preferences flow.
   * - `sections` defines the UI sections and maps them to component targets
   * - `cookingTime`, `cuisine`, and `dietPreferences` define selectable values
   */
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

  /**
   * Static content for the recipe results page.
   */
  recipeResults: {
    title: string,
    image: string,
    description: string,

  } = {
      title: 'The recipe results',
      image: '/assets/images/recipe/recipe-image.png',
      description: 'We took what you have and let our AI do the thinking. Here are 3 easy recipes you can make right now!',
    }

  /**
   * Static content and assets for the selected recipe page.
   * Includes section labels, helper text, and icon paths for like/unlike states.
   */
  selectedRecipe: {
    titleSection: string[]
    directions: string
    inspiration: string
    heartIcon: string
    likedHeartIcon: string
  } = {
      titleSection: [
        'Energie', 'Protein', 'Fat', 'Carbs'
      ],
      directions: 'Find inspiration for your next culinary adventure!',
      inspiration: '<strong>Just finished this Meal?</strong> Give it a heart, so that the others know this is delicious.',
      heartIcon: 'assets/shared-icons/heart.png',
      likedHeartIcon: 'assets/shared-icons/liked-heart.png'

    }

  /**
   * Static content for the cookbook overview page, including cuisine labels and assets.
   */
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

  /**
   * Image mappings for cuisine collection pages.
   * Provides separate images for desktop and mobile layouts.
   */
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