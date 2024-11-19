import { QuizCardColors } from '../enums/quiz-card-colors.enums';
import { QuizCategory } from '../models/quiz-category.model';

export const mockCategories: QuizCategory[] = [
  {
    category: 'Emoji Bands Quiz!',
    cardColor: QuizCardColors.ACCENT,
    numberOfQuestion: 10,
  },
  {
    category: 'Easter Emoji Quiz: Can You Get 100 Percent?',
    cardColor: QuizCardColors.WARNING,
    numberOfQuestion: 8,
  },
  {
    category: 'London Underground & Tube Station Emoji Quiz',
    cardColor: QuizCardColors.SUCCESS,
    numberOfQuestion: 12,
  },
  {
    category: 'Trivia Quiz: Guess The WWE Star From The Emoji!',
    cardColor: QuizCardColors.ERROR,
    numberOfQuestion: 15,
  },
  {
    category: 'Quiz: Can You Guess Which Celebs Have Had an Emoji Make-Over?',
    cardColor: QuizCardColors.BRIGHT,
    numberOfQuestion: 7,
  },
  {
    category: 'Cryptic Christmas Movie Emoji Quiz: Guess Them All!',
    cardColor: QuizCardColors.WARNING,
    numberOfQuestion: 9,
  },
  {
    category: 'What Emoji Am I? Quiz',
    cardColor: QuizCardColors.SUCCESS,
    numberOfQuestion: 14,
  },
  {
    category: 'Trivia Quiz: Can You Guess the Fortnite Skin by the Emoji?',
    cardColor: QuizCardColors.ACCENT,
    numberOfQuestion: 11,
  },
  {
    category: 'Guess The Emoji Quiz',
    cardColor: QuizCardColors.BRIGHT,
    numberOfQuestion: 13,
  },
  {
    category: 'Can You Name These Famous Emoji Combos?',
    cardColor: QuizCardColors.ERROR,
    numberOfQuestion: 10,
  },
];
