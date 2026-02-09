import { Injectable } from "@angular/core";
import { Database } from "@angular/fire/database";
import { ref, update } from "firebase/database";

/**
 * LikeService
 *
 * Handles liking/unliking recipes and persists the user's like state locally.
 *
 * Responsibilities:
 * - Stores a map of liked recipe keys in localStorage (`STORAGE_KEY`)
 * - Provides a quick lookup to determine whether a recipe is liked
 * - Toggles like state:
 *   - Updates the like count in Firebase Realtime Database
 *   - Updates the localStorage map accordingly
 */
@Injectable({ providedIn: "root" })
export class LikeService {
  /** localStorage key used to persist liked recipes. */
  private STORAGE_KEY = "likedRecipes";

  constructor(private db: Database) { }

  /**
   * Checks whether a recipe is marked as liked in localStorage.
   *
   * @param recipeKey Unique recipe identifier/key
   * @returns true if the recipe is liked, otherwise false
   */
  isLiked(recipeKey: string): boolean {
    return !!this.getLikedMap()[recipeKey];
  }

  /**
   * Toggles the like state for a given recipe.
   *
   * Behavior:
   * - If already liked:
   *   - removes it from the local liked map
   *   - decrements like count (never below 0)
   * - If not liked:
   *   - adds it to the local liked map
   *   - increments like count
   *
   * Side effects:
   * - Persists updated like count to Firebase Realtime Database
   * - Persists updated liked map to localStorage
   *
   * @param recipeKey     Unique recipe identifier/key
   * @param currentLikes  Current like count (may be undefined)
   * @param cuisine       Cuisine path segment used to locate the recipe in the database
   * @returns Promise resolving to the updated like count
   */
  async toggleLike(recipeKey: string, currentLikes: number | undefined, cuisine: string): Promise<number> {
    const likedMap = this.getLikedMap();
    const cuisinePath = this.normalizePath(cuisine);
    const recipeRef = ref(this.db, `${cuisinePath}/${recipeKey}`);

    const likesNow = currentLikes ?? 0;
    let newLikes = likesNow;

    if (likedMap[recipeKey]) {
      delete likedMap[recipeKey];
      newLikes = Math.max(likesNow - 1, 0);
    } else {
      likedMap[recipeKey] = true;
      newLikes = likesNow + 1;
    }

    await update(recipeRef, { likes: newLikes });
    this.saveLikedMap(likedMap);

    return newLikes;
  }

  /**
   * Normalizes a database path segment by trimming whitespace and removing
   * leading/trailing slashes.
   *
   * @param path Raw path string
   * @returns Normalized path string
   */
  private normalizePath(path: string): string {
    return (path ?? "").trim().replace(/^\/+|\/+$/g, "");
  }

  /**
   * Reads the liked recipe map from localStorage.
   *
   * @returns Record mapping recipeKey -> liked (true)
   */
  private getLikedMap(): Record<string, boolean> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  /**
   * Writes the liked recipe map to localStorage.
   *
   * @param map Record mapping recipeKey -> liked (true)
   */
  private saveLikedMap(map: Record<string, boolean>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
  }
}
