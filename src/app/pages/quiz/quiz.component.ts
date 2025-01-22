import { Component } from '@angular/core';
import { UiQuestionCardComponent } from '../../shared/ui-kit/ui-question-card/ui-question-card.component';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { NavigationConfirmDialogComponent } from '../../shared/ui-kit/ui-navigation-confirm-dialog/ui-navigation-confirm-dialog.component';

@Component({
  selector: 'quiz-quiz',
  standalone: true,
  imports: [
    UiQuestionCardComponent,
    UiButtonComponent,
    NavigationConfirmDialogComponent,
  ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent {}
