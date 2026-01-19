// import { Injectable, inject } from "@angular/core";
// import { IngredientService } from "./ingredient.service";
// import { Database } from "@angular/fire/database";
// import { ref, update, query, orderByChild, get, equalTo } from "firebase/database";


// @Injectable({ providedIn: 'root' })
// export class LikeService {

//   public data = inject(IngredientService)
//   private STORAGE_KEY = 'likedRecipes';

//   constructor(private db: Database) {}

//   // ---------------- PUBLIC ----------------

//   isLiked(recipeId: number): boolean {
//     return !!this.getLikedMap()[recipeId];
//   }

//   async toggleLike(recipeId: number, currentLikes: number, cuisine: string): Promise<void> {
//     const likedMap = this.getLikedMap();
//     const recipeKey = await this.findRecipeKeyById(recipeId, cuisine);
//     console.log(recipeKey)

//     if (!recipeKey) {
//       console.warn('Recipe not found for id', recipeId);
//       return;
//     }

//     const recipeRef = ref(this.db, `${cuisine}/${recipeKey}`);

//     if (likedMap[recipeId]) {
//       // UNLIKE
//       delete likedMap[recipeId];
//       await update(recipeRef, {
//         likes: Math.max(currentLikes - 1, 0)
//       });
//     } else {
//       // LIKE
//       likedMap[recipeId] = true;
//       await update(recipeRef, {
//         likes: currentLikes + 1
//       });
//     }

//     this.saveLikedMap(likedMap);
//   }

//   // ---------------- PRIVATE ----------------

//   private async findRecipeKeyById(recipeId: number, cuisine: string): Promise<string | null> {
//     const recipesRef = ref(this.db, cuisine);
//     console.log(recipesRef)
//     const q = query(recipesRef, orderByChild('id'), equalTo(recipeId));
//     const snapshot = await get(q);

//     if (!snapshot.exists()) return null;

//     // Es gibt genau EIN Rezept mit dieser ID
//     return Object.keys(snapshot.val())[0];
//   }

//   private getLikedMap(): Record<number, boolean> {
//     const raw = localStorage.getItem(this.STORAGE_KEY);
//     return raw ? JSON.parse(raw) : {};
//   }

//   private saveLikedMap(map: Record<number, boolean>): void {
//     localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
//   }
// }

import { Injectable, inject } from "@angular/core";
import { IngredientService } from "./ingredient.service";
import { Database } from "@angular/fire/database";
import { ref, update, query, orderByChild, get, equalTo } from "firebase/database";

@Injectable({ providedIn: 'root' })
export class LikeService {

  public data = inject(IngredientService);
  private STORAGE_KEY = 'likedRecipes';

  constructor(private db: Database) {}

  isLiked(recipeId: number): boolean {
    return !!this.getLikedMap()[recipeId];
  }

  async toggleLike(recipeId: number, currentLikes: number, cuisine: string): Promise<void> {
    const likedMap = this.getLikedMap();

    // const cuisinePath = this.normalizePath(cuisine);
    console.log(cuisine)
    const recipeKey = await this.findRecipeKeyById(recipeId, cuisine);

    console.log('recipeKey:', recipeKey, 'cuisinePath:', cuisine);

    if (!recipeKey) {
      console.warn('Recipe not found for id', recipeId, 'in cuisine', cuisine);
      return;
    }

    const recipeRef = ref(this.db, `${cuisine}/${recipeKey}`);

    if (likedMap[recipeId]) {
      delete likedMap[recipeId];
      await update(recipeRef, { likes: Math.max(currentLikes - 1, 0) });
    } else {
      likedMap[recipeId] = true;
      await update(recipeRef, { likes: currentLikes + 1 });
    }

    this.saveLikedMap(likedMap);
  }

  private async findRecipeKeyById(recipeId: number, cuisinePath: string): Promise<string | null> {
    const recipesRef = ref(this.db, cuisinePath);

    // number match
    console.log(recipeId)
    let snapshot = await get(query(recipesRef, orderByChild('id'), equalTo(recipeId)));

    // fallback string match
    if (!snapshot.exists()) {
      snapshot = await get(query(recipesRef, orderByChild('id'), equalTo(String(recipeId))));
    }

    if (!snapshot.exists()) return null;

    return Object.keys(snapshot.val())[0] ?? null;
  }

  private normalizePath(path: string): string {
    return (path ?? '').trim().replace(/^\/+|\/+$/g, '');
  }

  private getLikedMap(): Record<number, boolean> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  private saveLikedMap(map: Record<number, boolean>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(map));
  }
}
