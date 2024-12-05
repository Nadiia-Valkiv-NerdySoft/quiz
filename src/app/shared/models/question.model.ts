import { QuestionApiResponse } from './question-api-response.model';
import { Option } from './option.model';

export interface Question extends QuestionApiResponse {
  answers?: Option[];
}
