import { Component } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'quiz-ui-navigation-confirm-dialog',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './ui-navigation-confirm-dialog.component.html',
})
export class NavigationConfirmDialogComponent {
  confirm() {
    return true;
  }

  cancel() {
    return false;
  }
}
