import { QuizCardColors } from '../enums/quiz-card-colors.enums';

export interface QuizCategory {
  id: string;
  name: string;
  cardColor?: QuizCardColors;
  numberOfQuestion?: number;
}
