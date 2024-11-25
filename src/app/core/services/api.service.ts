import { Observable, map, catchError } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';
import { hideSpinner } from '../../store/categories.store';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly categoriesUrl = environment.categoriesUrl;
  private readonly http = inject(HttpClient);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  fetchCategories(): Observable<QuizCategory[]> {
    return this.http
    .get<{ trivia_categories: QuizCategory[] }>(this.categoriesUrl)
    .pipe(
      map(response => response.trivia_categories),
      catchError((error) => {
        hideSpinner();
        return this.errorHandlerService.handleError(error);
      }),
    );
  }
}
