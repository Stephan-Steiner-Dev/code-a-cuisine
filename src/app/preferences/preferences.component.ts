import { CommonModule } from "@angular/common";
import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { DataService } from '../shared/service/data.service';
import { IngredientService } from '../shared/service/ingredient.service';

/**
 * PreferencesComponent
 *
 * Collects the user's recipe preferences (cooking time, cuisine, diet) and numeric settings
 * (portions, persons). On submit, it stores the preferences in `IngredientService`,
 * triggers data submission, and navigates to the loading page.
 *
 * Key behaviors:
 * - `toggleSelection(...)` enforces a single selection per preference group by clearing the
 *   target array before adding the new value.
 * - `minus(...)` / `plus(...)` adjust numeric preferences within defined bounds.
 * - `resetArrays()` restores all preferences to their default state.
 */
@Component({
  standalone: true,
  selector: 'app-preferences',
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss', './preferences.mobile.scss']
})
export class PreferencesComponent {
  /** Exposes the Math object for use in the template (e.g., rounding). */
  Math = Math;

  /** Selected cooking time preference(s). Enforced as single-choice via `toggleSelection`. */
  selectedCookingTimes: string[] = [];

  /** Selected cuisine preference(s). Enforced as single-choice via `toggleSelection`. */
  selectedCuisines: string[] = [];

  /** Selected diet preference(s). Enforced as single-choice via `toggleSelection`. */
  selectedDiets: string[] = [];

  /** Generic name used to reference one of the selection arrays dynamically. */
  arrayName: string = '';

  /** Desired number of portions (bounded in `plus`/`minus`). */
  portions: number = 2;

  /** Number of persons/participants (bounded in `plus`/`minus`). */
  persons: number = 1;

  /** Angular router for navigation (injected). */
  public router = inject(Router);

  /** Shared data access layer (injected). */
  public dataService = inject(DataService);

  /** Provides preference storage and submission behavior (injected). */
  public ingredientService = inject(IngredientService);

  /**
   * Toggles a value in one of the selection arrays specified by `target`.
   * If the value is not selected, it clears the array first (single-choice) then adds the value.
   * If the value is already selected, it removes it.
   *
   * @param target Name of the array property on this component (e.g. 'selectedCuisines')
   * @param value  The option value to toggle
   */
  toggleSelection(target: string, value: string): void {
    const array = (this as any)[target] as string[];
    if (!array) return;
    const index = array.indexOf(value);
    if (index === -1) {
      array.length = 0;
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  /**
   * Checks whether a value is selected inside the target selection array.
   *
   * @param target Name of the array property on this component (e.g. 'selectedDiets')
   * @param value  The option value to check
   * @returns true if the value exists in the array, otherwise false
   */
  isSelected(target: string, value: string): boolean {
    const array = (this as any)[target] as string[];

    if (!array) return false;

    return array.includes(value);
  }

  /**
   * Persists the current preferences into IngredientService and triggers submission.
   * Navigates to the loading page (called twice in the current logic).
   *
   * Stored structure:
   * ingredientService.preferenceList = [{
   *   cookingTime, cuisine, diet, portions, persons
   * }]
   */
  submitPreferences() {
    this.router.navigate(['/loading-page']);
    this.ingredientService.preferenceList = [{
      cookingTime: this.selectedCookingTimes,
      cuisine: this.selectedCuisines,
      diet: this.selectedDiets,
      portions: this.portions,
      persons: this.persons
    }];
    this.resetArrays();
    this.ingredientService.submitData();
    this.router.navigate(['/loading-page']);
  }

  /**
   * Resets all selection arrays and numeric values to their defaults.
   */
  resetArrays() {
    this.selectedCookingTimes = [];
    this.selectedCuisines = [];
    this.selectedDiets = [];
    this.portions = 2;
    this.persons = 1;
  }

  /**
   * Decrements a numeric preference within allowed bounds.
   * - portions: minimum 1
   * - persons: minimum 1
   *
   * @param unit Either 'portions' or 'persons'
   */
  minus(unit: string) {
    if (unit === 'portions' && this.portions > 1) {
      this.portions--;
    } else if (unit === 'persons' && this.persons > 1) {
      this.persons--;
    }
  }

  /**
   * Increments a numeric preference within allowed bounds.
   * - portions: maximum 12
   * - persons: maximum 3
   *
   * @param unit Either 'portions' or 'persons'
   */
  plus(unit: string) {
    if (unit === 'portions' && this.portions < 12) {
      this.portions++;
    } else if (unit === 'persons' && this.persons < 3) {
      this.persons++;
    }
  }

  /**
   * Navigates back to the ingredient selection page.
   */
  back() {
    this.router.navigate(['/select-ingredients']);
  }
}
