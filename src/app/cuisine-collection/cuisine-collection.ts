import { Component, inject } from '@angular/core';
import { FirebaseDbService, Recipe } from '../shared/service/firebase-db';
import { CommonModule } from '@angular/common';
import { DataService } from '../shared/service/data.service';
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuisine-collection',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cuisine-collection.html',
  styleUrl: './cuisine-collection.scss',
})

export class CuisineCollection {
  public firebaseDB = inject(FirebaseDbService)
  public dataService = inject(DataService)
  private router = inject(Router)

  recipes: Recipe[] = [];

  ngOnInit() {
    this.recipes = this.firebaseDB.currentCuisineRecipes;
  }

  navigate(target: string) {
    this.router.navigate([target])
  }
}
