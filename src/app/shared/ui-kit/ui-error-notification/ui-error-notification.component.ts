import { Component, input } from '@angular/core';

@Component({
  selector: 'quiz-ui-error-notification',
  standalone: true,
  imports: [],
  templateUrl: './ui-error-notification.component.html',
})
export class UiErrorNotificationComponent {
  errorMessage = input();
}
