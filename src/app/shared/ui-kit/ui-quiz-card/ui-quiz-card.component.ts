import { Component, input, OnInit } from '@angular/core';
import { QUIZ_CARD_STYLES } from './ui-quiz-card.styles';
import { QuizCardColors } from '../../enums/quiz-card-colors.enums';
import { QuizCardStyle } from './ui-quiz-card.types';
import { QuizCategory } from '../../models/quiz-category.model';
import { DEFAULT_CARD_COLOR } from './ui-quiz-card.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-quiz-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ui-quiz-card.component.html',
})
export class UiQuizCardComponent implements OnInit {
  quizCategory = input<QuizCategory>();

  categoryUrlRoute!: string[];

  get styles(): QuizCardStyle[QuizCardColors] {
    return QUIZ_CARD_STYLES[
    this.quizCategory()?.cardColor ?? DEFAULT_CARD_COLOR
    ];
  }

  ngOnInit(): void {
    this.categoryUrlRoute = [
      '/quiz',
      this.quizCategory()!.id!.toString(),
      this.quizCategory()!.numberOfQuestion!.toString(),
    ];
  }
}
