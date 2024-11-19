import { QuizCardColors } from '../enums/quiz-card-colors.enums';

export interface QuizCategory {
  category: string;
  cardColor: QuizCardColors;
  numberOfQuestion: number;
}
