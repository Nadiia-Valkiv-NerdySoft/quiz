interface QuizCategory {
  category: string;
  cardColor: string;
  numberOfQuestion: number;
  categoryAvatarSrc: string;
}
import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'quiz-quiz-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-quiz-card.component.html',
})
export class UiQuizCardComponent {
  quizCategory = input<QuizCategory>();
}
