export interface UserStatisticsAdmin {
  category: string;
  total_questions: number;
  answers: {
    wrong: number;
    right: number;
  };
  score: number;
}
