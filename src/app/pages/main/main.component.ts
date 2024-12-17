import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';

@Component({
  selector: 'quiz-main',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {}
