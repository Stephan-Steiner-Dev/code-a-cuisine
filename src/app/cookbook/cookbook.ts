import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeLite } from '../shared/service/firebase-db';

@Component({
  selector: 'app-cookbook',
  imports: [CommonModule],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})

export class Cookbook {
  constructor(private location: Location) { }

  public dataService = inject(DataService)
  public firebaseDB = inject(FirebaseDbService)
  public cuisine$!: Observable<any | null>
  private router = inject(Router);
  public topRecipe$!: Observable<RecipeLite | null>;
  public topByCuisine$ = this.firebaseDB.getTopRecipesAllCuisines$();

  getRecipes(cuisine: string) {
    this.firebaseDB.currentCuisine = cuisine
    this.firebaseDB.getCuisine$(cuisine)
      .pipe(take(1))
      .subscribe((recipes: Recipe[]) => {
        this.firebaseDB.currentCuisineRecipes = recipes; // ✅ Snapshot speichern
        this.router.navigate(['/cookbook-collection']);  // ✅ dann navigieren
      });
  }

  navigate(target: string) {
    if (target === 'back') {
      this.location.back();
      return;
    } else {
      this.router.navigate([target]);
    }
  }

  getTopRecipe(cuisine: string) {
    this.topRecipe$ = this.firebaseDB.getTopRecipeByCuisine$(cuisine);

    this.topRecipe$.subscribe(r => {
      console.log('TOP RECIPE:', r);
    });
  }
}
