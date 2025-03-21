import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { QuestionApiResponse } from '../../shared/models/question-api-response.model';
import { Question } from '../../shared/models/question.model';
import { RandomUtils } from '../../utils/random';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly apiService = inject(ApiService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  getQuestions(amount: number, id: number): Observable<Question[]> {
    return this.apiService.fetchQuestions(id, amount).pipe(
      map(questions => questions.map(q => this.mergeAndShuffleAnswers(q))),
      catchError(this.errorHandlerService.handleError),
    );
  }

  private mergeAndShuffleAnswers(question: QuestionApiResponse): Question {
    const answers = [ ...question.incorrect_answers, question.correct_answer ];
    return {
      ...question,
      answers: RandomUtils.getRandomItems(answers, answers.length),
    };
  }
}
