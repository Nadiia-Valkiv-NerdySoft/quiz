import { Component, input, OnInit } from '@angular/core';
import { QUIZ_CARD_STYLES } from './quiz-card.styles';
import { QuizCardColors } from './quiz-card-colors.enums';
import { QuizCardStyle } from './quiz-card.types';
import { QuizCategory } from '../../../../shared/models/quiz-category.model';
import { DEFAULT_CARD_COLOR } from './quiz-card.constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-quiz-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz-card.component.html',
})
export class QuizCardComponent implements OnInit {
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
