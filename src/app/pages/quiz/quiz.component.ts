import { Component } from '@angular/core';
import { UiQuestionCardComponent } from '../../shared/ui-kit/ui-question-card/ui-question-card.component';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';

@Component({
  selector: 'quiz-quiz',
  standalone: true,
  imports: [ UiQuestionCardComponent, UiButtonComponent ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent {}
