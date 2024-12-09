import { QuestionApiResponse } from './question-api-response.model';

export interface Question extends QuestionApiResponse {
  answers?: string[];
  userAnswer?: string;
}
