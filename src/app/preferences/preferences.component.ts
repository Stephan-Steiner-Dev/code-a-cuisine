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
  arrayName: string = '';
  portions: number = 2;
  persons: number = 1;

  constructor(private router: Router, public dataService: DataService) { }

toggleSelection(target: string, value: string): void {
  const array = (this as any)[target] as string[];
  if (!array) return;
  const index = array.indexOf(value);
  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
}


  isSelected(target: string, value: string): boolean {
    const array = (this as any)[target] as string[];
    console.log(array);
    
    if (!array) return false;

    return array.includes(value);
  }


  submitPreferences() {
    this.router.navigate(['/loading-page'])
    console.log({
      cookingTime: this.selectedCookingTimes,
      cuisine: this.selectedCuisines,
      diet: this.selectedDiets
    });
    this.resetArrays()
  }

  resetArrays(){
  this.selectedCookingTimes = [];
  this.selectedCuisines = [];
  this.selectedDiets = [];
  }

  minus(unit: string) {
    if (unit === 'portions') {
      this.portions--
    } else if (unit === 'persons') {
      this.persons--
    }
  }

  plus(unit: string) {
    if (unit === 'portions') {
      this.portions++
    } else if (unit === 'persons') {
      this.persons++
    }
  }

  back() {
    this.router.navigate(['/select-ingredients'])
  }
}
