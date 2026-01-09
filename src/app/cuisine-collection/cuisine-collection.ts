import { Component, inject } from '@angular/core';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';


@Component({
  selector: 'app-cuisine-collection',
  imports: [CommonModule],
  templateUrl: './cuisine-collection.html',
  styleUrl: './cuisine-collection.scss',
})
export class CuisineCollection {
  public firebaseDB = inject(FirebaseDbService)
  public dataService = inject(DataService)

  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipes = this.firebaseDB.currentCuisineRecipes;
  }

}
