import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IngredientService, Ingredient } from '../shared/service/ingredient.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-ingredients',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './select-ingredients.component.html',
  styleUrls: ['./select-ingredients.component.scss', './select-ingredients.mobile.scss']
})
export class SelectIngredientsComponent {

  ingredientList: Ingredient[] = [];
  ingredient: string = '';
  amount: number | null = null;
  selectedUnit: string = '';
  dropdownOpen: boolean = false;

  constructor(private ingredientService: IngredientService, private router: Router) {
    this.ingredientList = this.ingredientService.getIngredients();
  }

  nextStep() {
     this.router.navigate(['/preferences']);
  }

  deleteIngredient(i: number) {
    this.ingredientService.deleteIngredient(i);
  }

  editIngredient(i: number) {
    this.ingredient = this.ingredientList[i].ingredient;
    this.selectedUnit = this.ingredientList[i].selectedUnit;
    this.amount = this.ingredientList[i].amount;
    this.deleteIngredient(i);
  }

  addIngredient() {
    if (!this.ingredient || !this.amount || !this.selectedUnit) { return }
    const newItem: Ingredient = { ingredient: this.ingredient, amount: this.amount, selectedUnit: this.selectedUnit }

    this.ingredientService.addIngredient(newItem);
    this.ingredient = '';
    this.amount = null;
    this.selectedUnit = '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  select(value: string) {
    this.selectedUnit = value;
    this.dropdownOpen = false;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.dropdownOpen = false;
  }
}