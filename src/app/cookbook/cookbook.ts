import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { FirebaseDbService } from '../shared/service/firebase-db';
import { Observable } from 'rxjs';
import { log } from 'node:console';

@Component({
  selector: 'app-cookbook',
  imports: [CommonModule],
  templateUrl: './cookbook.html',
  styleUrl: './cookbook.scss',
})
export class Cookbook {
  public dataService = inject(DataService)
  public firebaseDB = inject(FirebaseDbService)
  public cuisine$!: Observable<any | null>

  getRecipes(cuisine: string) {
    this.cuisine$ = this.firebaseDB.getCuisine$(cuisine);
   
  this.cuisine$.subscribe(value => {
    console.log('Firebase value:', value);
  });

  }
}
