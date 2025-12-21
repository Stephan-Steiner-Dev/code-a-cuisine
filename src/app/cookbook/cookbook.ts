import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { FirebaseDbService } from '../shared/service/firebase-db';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  getRecipes(cuisine: string) {
    this.cuisine$ = this.firebaseDB.getCuisine$(cuisine);

    this.cuisine$.subscribe(value => {
      console.log('Firebase value:', value);
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
}
