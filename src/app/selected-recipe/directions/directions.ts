import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';
import { FirebaseDbService } from '../../shared/service/firebase-db';
import { LikeService } from '../../shared/service/like-service';

@Component({
  selector: 'app-directions',
  imports: [],
  templateUrl: './directions.html',
  styleUrls: ['./directions.scss', './directions.mobile.scss']
})
export class Directions {
  public dataService = inject(DataService)
  public ingredientService = inject(IngredientService)
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe]
  public firebaseDB = inject(FirebaseDbService)
  public likeService = inject(LikeService)

  like() {
    console.log(this.currentRecipe)
    // this.likeService.toggleLike(this.currentRecipe.id, this.currentRecipe.likes, this.currentRecipe.cuisine);
  }
}


