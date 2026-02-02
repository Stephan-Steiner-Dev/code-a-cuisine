import { Injectable } from "@angular/core";
import { Database } from "@angular/fire/database";
import { ref, update } from "firebase/database";

@Injectable({ providedIn: "root" })
export class LikeService {
  private STORAGE_KEY = "likedRecipes";

  constructor(private db: Database) {}

  isLiked(recipeKey: string): boolean {
    return !!this.getLikedMap()[recipeKey];
  }

  async toggleLike(recipeKey: string, currentLikes: number | undefined, cuisine: string): Promise<void> {
    const likedMap = this.getLikedMap();
    const cuisinePath = this.normalizePath(cuisine);

    const recipeRef = ref(this.db, `${cuisinePath}/${recipeKey}`);

    const likesNow = currentLikes ?? 0;

    if (likedMap[recipeKey]) {
      delete likedMap[recipeKey];
      await update(recipeRef, { likes: Math.max(likesNow - 1, 0) });
    } else {
      likedMap[recipeKey] = true;
      await update(recipeRef, { likes: likesNow + 1 });
    }

    this.saveLikedMap(likedMap);
  }

  private normalizePath(path: string): string {
    return (path ?? "").trim().replace(/^\/+|\/+$/g, "");
  }

  private getLikedMap(): Record<string, boolean> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  private saveLikedMap(map: Record<string, boolean>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
  }
}