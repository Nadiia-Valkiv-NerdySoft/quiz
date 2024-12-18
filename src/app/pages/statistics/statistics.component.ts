import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';

@Component({
  selector: 'quiz-statistics',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {}
