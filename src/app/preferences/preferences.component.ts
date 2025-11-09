import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from '../shared/button/button.component';
import { Router } from '@angular/router';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss', './preferences.mobile.scss']
})
export class PreferencesComponent {
  selectedCookingTimes: string[] = [];
  selectedCuisines: string[] = [];
  selectedDiets: string[] = [];

  constructor(private router: Router, public dataService: DataService) {}

  portions: number = 2;
  persons: number = 1;

  generateRecipe() {
    
  }

  toggleSelection(array: string[], value: string) {
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  isSelected(array: string[], value: string): boolean {
    return array.includes(value);
  }

  submitPreferences() {
    console.log({
      cookingTime: this.selectedCookingTimes,
      cuisine: this.selectedCuisines,
      diet: this.selectedDiets
    });
  }

  minus(unit:string) {
    if(unit === 'portions'){
      this.portions--
    } else if (unit === 'persons'){
      this.persons--
    }
  }

  plus(unit:string) {
        if(unit === 'portions'){
      this.portions++
    } else if (unit === 'persons'){
      this.persons++
    }
  }

  back() {
    this.router.navigate(['/select-ingredients'])
  }
}
