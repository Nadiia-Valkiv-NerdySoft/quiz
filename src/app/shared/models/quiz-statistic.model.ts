export interface QuizStatistic {
  rightAnswers: number;
  allAnswers: number;
  time: number;
}

export const INITIAL_QUIZ_STATISTIC: QuizStatistic = {
  rightAnswers: 0,
  allAnswers: 0,
  time: 0,
};
