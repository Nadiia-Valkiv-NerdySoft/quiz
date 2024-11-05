import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-ui-button',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './ui-button.component.html',
})
export class UiButtonComponent {
  @Input() route: string = '';
  @Output() buttonClick = new EventEmitter<void>();
  private router = inject(Router);

  onClick() {
    this.buttonClick.emit();
    this.router.navigate([this.route]);
  }
}
