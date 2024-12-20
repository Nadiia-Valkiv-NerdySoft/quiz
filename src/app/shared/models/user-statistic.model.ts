export interface UserStatistic {
  numberOfQuizzes: number;
  numberOfAllQuestions: number;
  numberOfRightQuestions: number;
  numberOfWrongQuestions: number;
  averageTimePerOneQuiz: number;
}

export const INITIAL_USER_STATISTIC: UserStatistic = {
  numberOfQuizzes: 0,
  numberOfAllQuestions: 0,
  numberOfRightQuestions: 0,
  numberOfWrongQuestions: 0,
  averageTimePerOneQuiz: 0,
};
