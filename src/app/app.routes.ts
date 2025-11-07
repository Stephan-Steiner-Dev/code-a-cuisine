import { Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './shared/header/header.component';
import { SelectIngredientsComponent } from './select-ingredients/select-ingredients.component';
import { PreferencesComponent } from './preferences/preferences.component';

export const routes: Routes = [
    { path: '', component: LandingpageComponent },
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'select-ingredients', component: SelectIngredientsComponent },
    { path: 'preferences', component: PreferencesComponent }
];