import { Component, inject } from '@angular/core';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { IngredientService } from '../shared/service/ingredient.service';

/**
 * CuisineCollection Component
 *
 * Displays all recipes belonging to the currently selected cuisine.
 * Recipes are retrieved from FirebaseDbService and rendered with client-side pagination.
 *
 * Features:
 * - Displays 15 recipes per page (configurable)
 * - Pagination controls (next, previous, go to page)
 * - Stores selected recipe in IngredientService
 * - Navigates to recipe detail view
 *
 * Used in context of AI-generated recipes (via n8n workflow).
 */
@Component({
  selector: 'app-cuisine-collection',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cuisine-collection.html',
  styleUrls: ['./cuisine-collection.scss', './cuisine-collection.mobile.scss']
})
export class CuisineCollection {

  /** Firebase database service providing cuisine recipe data. */
  public firebaseDB = inject(FirebaseDbService);

  /** Shared application data service (e.g., cuisine images, metadata). */
  public dataService = inject(DataService);

  /** Angular Router instance used for navigation. */
  private router = inject(Router);

  /**
   * IngredientService acts as shared state storage
   * for passing the selected recipe to the detail view.
   */
  private ingredientService = inject(IngredientService);

  /** All recipes belonging to the selected cuisine. */
  recipes: Recipe[] = [];

  /** Number of recipes displayed per page. */
  pageSize = 15;

  /** Currently active pagination page (1-based index). */
  currentPage = 1;

  /**
   * Angular lifecycle hook.
   * Initializes recipe list and resets pagination.
   */
  ngOnInit(): void {
    this.recipes = this.firebaseDB.currentCuisineRecipes ?? [];
    this.currentPage = 1;
  }

  /**
   * Calculates total number of available pages
   * based on recipe count and page size.
   *
   * @returns Total number of pagination pages (minimum 1)
   */
  get totalPages(): number {
    return Math.max(1, Math.ceil((this.recipes?.length ?? 0) / this.pageSize));
  }

  /**
   * Returns the recipes for the currently selected page.
   *
   * @returns Array of recipes sliced for the active page
   */
  get pagedRecipes(): Recipe[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return (this.recipes ?? []).slice(start, start + this.pageSize);
  }

  /**
   * Navigates to the next page if available.
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Navigates to the previous page if available.
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Navigates directly to a specific page.
   * Ensures the page number stays within valid bounds.
   *
   * @param page Target page number (1-based)
   */
  goToPage(page: number): void {
    const validatedPage = Math.min(Math.max(page, 1), this.totalPages);
    this.currentPage = validatedPage;
  }

  /**
   * Resets pagination back to page 1.
   * Useful when cuisine or recipe list changes.
   */
  resetPagination(): void {
    this.currentPage = 1;
  }

  /**
   * Navigates to a specific route.
   *
   * @param target Route path
   */
  navigate(target: string): void {
    this.router.navigate([target]);
  }

  /**
   * Opens the selected recipe:
   * - Sets current recipe index to 0
   * - Stores recipe in IngredientService
   * - Navigates to the recipe detail page
   *
   * @param recipe Selected recipe object
   */
  navigateToRecipe(recipe: Recipe): void {
    this.ingredientService.currentRecipe = 0;
    this.ingredientService.recipes[0] = recipe;
    this.router.navigate(['/selected-recipe']);
  }
}