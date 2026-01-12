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

export const routes: Routes = [
    { path: '', component: LandingpageComponent },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'select-ingredients', component: SelectIngredientsComponent },
    { path: 'preferences', component: PreferencesComponent },
    { path: 'loading-page', component: LoadingPageComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'selected-recipe', component: SelectedRecipeComponent },
    { path: 'cookbook', component: Cookbook },
    { path: 'cuisine-collection', component: CuisineCollection }
];