import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';

/**
 * ButtonComponent
 *
 * Reusable button component with configurable appearance and behavior.
 * All visual and interaction properties are controlled via @Input bindings.
 *
 * Supported customizations include:
 * - Button text
 * - Text color and background color
 * - Disabled state
 * - Hover color
 * - Font size and weight
 *
 * Styling and interaction behavior are defined in the associated template and styles.
 */
@Component({
    standalone: true,
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  /** Text displayed inside the button. Defaults to "Klick mich". */
  @Input() text: string = 'Klick mich';

  /** Text color of the button. */
  @Input() color: string = '';

  /** Background color of the button. */
  @Input() backgroundColor: string = '';

  /** Whether the button is disabled and non-interactive. */
  @Input() disabled: boolean = false;

  /** Hover color applied when the pointer is over the button. */
  @Input() hoverColor: string = '';

  /** Font size used for the button text. */
  @Input() fontSize: string = '';

  /** Font weight used for the button text. */
  @Input() fontWeight: string = '';
}
