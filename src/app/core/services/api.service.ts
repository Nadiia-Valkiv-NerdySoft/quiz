import { Observable, map } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QuestionApiResponse } from '../../shared/models/question-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly categoriesUrl = environment.categoriesUrl;
  private readonly questionUrl = environment.questionUrl;
  private readonly http = inject(HttpClient);

  fetchCategories(): Observable<QuizCategory[]> {
    return this.http
    .get<{ trivia_categories: QuizCategory[] }>(this.categoriesUrl)
    .pipe(map(response => response.trivia_categories));
  }

  fetchQuestions(
    categoryId: number,
    numberOfQuestions: number,
  ): Observable<QuestionApiResponse[]> {
    return this.http
    .get<{
        results: QuestionApiResponse[];
      }>(
        `${this.questionUrl}?amount=${numberOfQuestions}&category=${categoryId}`,
      )
    .pipe(map(response => response.results));
  }
}
