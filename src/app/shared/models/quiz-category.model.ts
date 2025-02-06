import { QuizCardColors } from '../../pages/catalog/components/quiz-card/quiz-card-colors.enums';

export interface QuizCategory {
  id: string;
  name: string;
  cardColor?: QuizCardColors;
  numberOfQuestion?: number;
}
