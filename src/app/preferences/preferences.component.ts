import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  portions: number = 2;
  persons: number = 1;

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
}
