import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';
import { FirebaseDbService } from '../../shared/service/firebase-db';
import { LikeService } from '../../shared/service/like-service';
import { CommonModule } from '@angular/common';

/**
 * Directions component
 *
 * Displays the preparation steps for the currently selected recipe and assigns each step
 * to a "chef number" based on the recipe's `persons` value. Also handles the like/unlike
 * interaction and keeps the UI like state in sync with the LikeService.
 *
 * Notes:
 * - Uses Angular's `inject()` function for dependency injection.
 * - Uses `_lastRecipeId` to avoid recomputing state when the selected recipe hasn't changed.
 */
@Component({
  selector: 'app-directions',
  imports: [CommonModule],
  templateUrl: './directions.html',
  styleUrls: ['./directions.scss', './directions.mobile.scss']
})
export class Directions {
  /** Shared data access layer (injected). */
  public dataService = inject(DataService);

  /** Provides access to recipes and the currently selected recipe index (injected). */
  public ingredientService = inject(IngredientService);

  /** Firebase database service (injected). */
  public firebaseDB = inject(FirebaseDbService);

  /** Like service used to query and toggle like state (injected). */
  public likeService = inject(LikeService);

  /** Whether the current recipe is liked by the user (UI state). */
  public hasLiked = false;

  /**
   * Steps enriched with a "chef number".
   * Example: [{ text: "Chop onions", chef: 1 }, { text: "Heat pan", chef: 2 }]
   */
  public stepsWithChef: { text: string; chef: number }[] = [];

  /**
   * Caches the last processed recipe id to prevent unnecessary recomputation.
   * When the selected recipe changes, this value is updated and steps/like state are refreshed.
   */
  private _lastRecipeId?: string;

  /**
   * Angular lifecycle hook.
   * Initializes like state and step mapping for the current recipe once on component init.
   */
  ngOnInit() {
    const id = this.currentRecipe?.id;
    if (!id) return;
    this.hasLiked = this.likeService.isLiked(id);
    this.refreshStepsAndLikeState();
  }

  /**
   * Angular lifecycle hook.
   * Runs during every change detection cycle.
   * Delegates to `refreshStepsAndLikeState()` which will early-return if the recipe id did not change.
   */
  ngDoCheck() {
    this.refreshStepsAndLikeState();
  }

  /**
   * Click handler for the like button.
   * Prevents default navigation/side effects and stops event bubbling, then toggles like state.
   *
   * @param event Mouse click event
   */
  async onLikeClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    try {
      await this.like();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Toggles the like state for the current recipe via LikeService.
   * Updates:
   * - `hasLiked` UI state
   * - `currentRecipe.likes` count returned from the service
   */
  async like() {
    const newLikes = await this.likeService.toggleLike(
      this.currentRecipe.id,
      this.currentRecipe.likes,
      this.currentRecipe.cuisine
    );
    this.hasLiked = this.likeService.isLiked(this.currentRecipe.id);
    this.currentRecipe.likes = newLikes;
  }

  /**
   * Returns the currently selected recipe from IngredientService.
   * The selection is based on `ingredientService.currentRecipe` (assumed to be an index/key).
   */
  get currentRecipe() {
    return this.ingredientService.recipes[this.ingredientService.currentRecipe];
  }

  /**
   * Refreshes derived UI state when the selected recipe changes:
   * - Updates `hasLiked` based on LikeService
   * - Builds `stepsWithChef` by assigning each step to a chef number
   *
   * Chef assignment:
   * - Uses `persons` (defaults to 1 if missing)
   * - Chef number cycles from 1..persons using modulo arithmetic
   */
  private refreshStepsAndLikeState() {
    const recipe = this.currentRecipe;
    const id = recipe?.id;
    if (!id) return;
    if (this._lastRecipeId === id) return;
    this._lastRecipeId = id;
    this.hasLiked = this.likeService.isLiked(id);

    const persons = recipe.persons ?? 1;
    this.stepsWithChef = (recipe.steps ?? []).map((step: string, i: number) => ({
      text: step,
      chef: (i % persons) + 1
    }));
  }
}