import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string = 'Klick mich';   // Text auf dem Button
  @Input() color: string = 'transparent';     // Optional: für Styles
  @Input() disabled: boolean = false;     // Optional: deaktiviert
}
