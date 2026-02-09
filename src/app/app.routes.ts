import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './shared/header/header.component';
import { SelectIngredientsComponent } from './select-ingredients/select-ingredients.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { LoadingPageComponent } from './shared/loading-page/loading-page.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SelectedRecipeComponent } from './selected-recipe/selected-recipe.component';
import { Cookbook } from './cookbook/cookbook';
import { CuisineCollection } from './cuisine-collection/cuisine-collection';

/**
 * routes
 *
 * Defines the client-side routing configuration for the application.
 * Each route maps a URL path to a component.
 *
 * Navigation throughout the application uses these paths.
 */
export const routes: Routes = [
    /**
     * Default route — landing page.
     */
    { path: '', component: LandingpageComponent },

    /**
     * Explicit landing page route.
     */
    { path: 'landingpage', component: LandingpageComponent },

    /**
     * Header route (typically used for testing or direct access).
     */
    { path: 'header', component: HeaderComponent },

    /**
     * Ingredient selection step.
     */
    { path: 'select-ingredients', component: SelectIngredientsComponent },

    /**
     * Preferences selection step.
     */
    { path: 'preferences', component: PreferencesComponent },

    /**
     * Loading screen displayed while recipes are being prepared.
     */
    { path: 'loading-page', component: LoadingPageComponent },

    /**
     * Recipe results list.
     */
    { path: 'recipes', component: RecipesComponent },

    /**
     * Detailed view of the selected recipe.
     */
    { path: 'selected-recipe', component: SelectedRecipeComponent },

    /**
     * Cookbook overview page.
     */
    { path: 'cookbook', component: Cookbook },

    /**
     * Collection page for recipes of a specific cuisine.
     */
    { path: 'cuisine-collection', component: CuisineCollection }
];