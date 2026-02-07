import { Injectable } from "@angular/core";
import { Database } from "@angular/fire/database";
import { ref, update } from "firebase/database";

@Injectable({ providedIn: "root" })
export class LikeService {
  private STORAGE_KEY = "likedRecipes";

  constructor(private db: Database) { }

  isLiked(recipeKey: string): boolean {
    return !!this.getLikedMap()[recipeKey];
  }

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