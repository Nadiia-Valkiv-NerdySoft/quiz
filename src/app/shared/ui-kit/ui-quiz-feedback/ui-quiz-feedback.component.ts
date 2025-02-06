import { Component, input } from '@angular/core';
import { LastQuizData } from '../../models/last-quiz-data.model';
import { TimeFormatPipe } from './time-format.pipe';
import {
  QUIZ_FEEDBACK_DEFAULT_MESSAGE,
  QUIZ_FEEDBACK_MESSAGES,
} from './quiz-feedback-messages';

@Component({
  selector: 'quiz-ui-quiz-feedback',
  standalone: true,
  imports: [TimeFormatPipe],
  templateUrl: './ui-quiz-feedback.component.html',
})
export class QuizFeedbackComponent {
  lastQuizData = input.required<LastQuizData>();

  private getScorePercentage(): number {
    return (
      (this.lastQuizData().rightAnswers / this.lastQuizData().allAnswers) * 100
    );
  }

  getFeedbackMessage(): string {
    const percentage = this.getScorePercentage();

    const feedback = QUIZ_FEEDBACK_MESSAGES.find(
      item => percentage <= item.maxPercentage,
    );

    return feedback?.message || QUIZ_FEEDBACK_DEFAULT_MESSAGE;
  }
}
