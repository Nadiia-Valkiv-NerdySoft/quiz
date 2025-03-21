import { Component } from '@angular/core';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { UiButtonComponent } from '../../../../shared/ui-kit/ui-button/ui-button.component';
import { NavigationConfirmDialogComponent } from '../../../../shared/ui-kit/ui-navigation-confirm-dialog/ui-navigation-confirm-dialog.component';

@Component({
  selector: 'quiz-quiz',
  imports: [
    QuestionCardComponent,
    UiButtonComponent,
    NavigationConfirmDialogComponent,
  ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent {}
