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
  @Input() text: string = 'Klick mich';
  @Input() color: string = '';
  @Input() backgroundColor: string = '';
  @Input() disabled: boolean = false;
  @Input() hoverColor: string = '';
  @Input() fontSize: string = '';
  @Input() fontWeight: string = '';
}
