import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'quiz-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
  @Input() route: string = '';

  onClick() {
    alert(`opening catalog page ${this.route}`);
  }
}
