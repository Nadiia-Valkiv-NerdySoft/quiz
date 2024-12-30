import { Component, input } from '@angular/core';
import { LastQuizData } from '../../models/last-quiz-data.model';
import { TimeFormatPipe } from '../../../pages/statistics/time-format.pipe';

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
    if (percentage === 0) {
      return 'Do not worry! You can always try again!';
    }
    if (percentage < 33) {
      return 'Do not give up! Keep practicing, and you will see improvement.';
    }
    if (percentage < 66) {
      return 'Good try! Why not have another go? You might get a bigger score!';
    }
    if (percentage < 100) {
      return 'Outstanding performance! You have demonstrated excellent understanding of the material.';
    }
    if (percentage === 100) {
      return 'Absolutely brilliant!';
    }
    return '';
  }
}
