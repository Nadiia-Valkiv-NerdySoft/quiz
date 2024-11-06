import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-ui-button',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
  route = input<string>('');
  buttonClick = output<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
