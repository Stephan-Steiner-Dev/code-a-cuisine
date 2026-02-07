import { Component, inject } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { IngredientService } from '../../shared/service/ingredient.service';
import { FirebaseDbService } from '../../shared/service/firebase-db';
import { LikeService } from '../../shared/service/like-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directions',
  imports: [CommonModule],
  templateUrl: './directions.html',
  styleUrls: ['./directions.scss', './directions.mobile.scss']
})
export class Directions {
  public dataService = inject(DataService)
  public ingredientService = inject(IngredientService)
  public currentRecipe = this.ingredientService.recipes[this.ingredientService.currentRecipe]
  public firebaseDB = inject(FirebaseDbService)
  public likeService = inject(LikeService)
  public hasLiked = false;

ngOnInit() {
  const id = this.currentRecipe?.id;
  if (!id) return;

  this.hasLiked = this.likeService.isLiked(id);
}

  async like() {
    const newLikes = await this.likeService.toggleLike(this.currentRecipe.id, this.currentRecipe.likes, this.currentRecipe.cuisine);
    this.hasLiked = this.likeService.isLiked(this.currentRecipe.id);
    this.currentRecipe.likes = newLikes;
  }
}


