import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngredientService, Ingredient } from '../shared/service/ingredient.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router, RouterModule } from '@angular/router';

/**
 * SelectIngredientsComponent
 *
 * Manages the ingredient input flow:
 * - Displays the current ingredient list from IngredientService
 * - Allows adding, editing, and deleting ingredients
 * - Provides a unit dropdown with click-outside behavior to close it
 * - Navigates to the preferences step when the user is ready
 *
 * State overview:
 * - `ingredientList` holds the currently stored ingredients (loaded from the service)
 * - `ingredient`, `amount`, `selectedUnit` represent the current form input
 * - `dropdownOpen` controls whether the unit dropdown is visible
 */
@Component({
    standalone: true,
    selector: 'app-select-ingredients',
    imports: [CommonModule, FormsModule, ButtonComponent, RouterModule],
    templateUrl: './select-ingredients.component.html',
    styleUrls: ['./select-ingredients.component.scss', './select-ingredients.mobile.scss']
})
export class SelectIngredientsComponent {

  /** Ingredient list loaded from IngredientService. */
  ingredientList: Ingredient[] = [];

  /** Current ingredient name input. */
  ingredient: string = '';

  /** Current amount input (null when empty). */
  amount: number | null = null;

  /** Currently selected unit for the ingredient amount. */
  selectedUnit: string = '';

  /** Whether the unit dropdown is open. */
  dropdownOpen: boolean = false;

  /** Angular Router used for navigation (injected). */
  private router = inject(Router);

  /** IngredientService for CRUD operations and list retrieval (injected). */
  private ingredientService = inject(IngredientService);

  /**
   * Initializes the local ingredient list from the IngredientService.
   */
  constructor() {
    this.ingredientList = this.ingredientService.getIngredients();
  }

  /**
   * Navigates to the preferences step of the flow.
   */
  nextStep() {
     this.router.navigate(['/preferences']);
  }

  /**
   * Deletes an ingredient at the given index via the IngredientService.
   *
   * @param i Index of the ingredient to delete
   */
  deleteIngredient(i: number) {
    this.ingredientService.deleteIngredient(i);
  }

  /**
   * Loads an existing ingredient into the input fields for editing.
   * The original entry is removed immediately, and the user can re-add it after changes.
   *
   * @param i Index of the ingredient to edit
   */
  editIngredient(i: number) {
    this.ingredient = this.ingredientList[i].ingredient;
    this.selectedUnit = this.ingredientList[i].selectedUnit;
    this.amount = this.ingredientList[i].amount;
    this.deleteIngredient(i);
  }

  /**
   * Adds a new ingredient to the IngredientService if all required fields are present.
   * After adding, resets the input fields back to their defaults.
   */
  addIngredient() {
    if (!this.ingredient || !this.amount || !this.selectedUnit) { return; }
    const newItem: Ingredient = { ingredient: this.ingredient, amount: this.amount, selectedUnit: this.selectedUnit };

    this.ingredientService.addIngredient(newItem);
    this.ingredient = '';
    this.amount = null;
    this.selectedUnit = '';
  }

  /**
   * Toggles the unit dropdown open/closed.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * Selects a unit value and closes the dropdown.
   *
   * @param value The unit value selected by the user
   */
  select(value: string) {
    this.selectedUnit = value;
    this.dropdownOpen = false;
  }

  /**
   * Closes the dropdown when the user clicks anywhere in the document.
   * Triggered by the HostListener on 'document:click'.
   */
  @HostListener('document:click')
  closeDropdown() {
    this.dropdownOpen = false;
  }
}