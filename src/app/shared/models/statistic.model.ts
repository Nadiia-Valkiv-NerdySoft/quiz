import { INITIAL_QUIZ_STATISTIC, QuizStatistic } from './quiz-statistic.model';
import { INITIAL_USER_STATISTIC, UserStatistic } from './user-statistic.model';

export interface Statistic {
  lastQuizData: QuizStatistic;
  userStatistic: UserStatistic;
}

export const INITIAL_STATISTIC: Statistic = {
  lastQuizData: INITIAL_QUIZ_STATISTIC,
  userStatistic: INITIAL_USER_STATISTIC,
};
