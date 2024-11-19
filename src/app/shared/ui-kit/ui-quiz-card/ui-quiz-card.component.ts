import { Component, input } from '@angular/core';
import { QUIZ_CARD_STYLES } from './ui-quiz-card.styles';
import { QuizCardColors } from '../../enums/quiz-card-colors.enums';
import { QuizCardStyle } from './ui-quiz-card.types';
import { QuizCategory } from '../../models/quiz-category.model';
import { DEFAULT_CARD_COLOR } from './ui-quiz-card.constants';

@Component({
  selector: 'quiz-quiz-card',
  standalone: true,
  templateUrl: './ui-quiz-card.component.html',
})
export class UiQuizCardComponent {
  quizCategory = input<QuizCategory>();

  get styles(): QuizCardStyle[QuizCardColors] {
    return QUIZ_CARD_STYLES[
    this.quizCategory()?.cardColor ?? DEFAULT_CARD_COLOR
    ];
  }
}
