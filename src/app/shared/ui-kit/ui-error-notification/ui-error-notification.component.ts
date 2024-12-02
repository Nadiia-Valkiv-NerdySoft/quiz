import { Component, input, output } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'quiz-ui-error-notification',
  standalone: true,
  imports: [ UiButtonComponent, SvgIconComponent ],
  templateUrl: './ui-error-notification.component.html',
})
export class UiErrorNotificationComponent {
  errorMessage = input();
  tryAgainButtonClick = output<void>();

  onClick(): void {
    this.tryAgainButtonClick.emit();
  }
}
