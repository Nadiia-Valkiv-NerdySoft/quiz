import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { RandomUtils } from '../../utils/random';
import { CategoriesStoreService } from '../categories-store-service/categories-store.service';
import { ApiService } from '../api-service/api.service';
import {
  hideSpinner,
  showSpinner,
  skipWhenCategoriesCached,
} from '../../store/categories.store';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly categoriesNumber = environment.numberOfQuizCategories;
  private readonly minNumberQuestions = environment.minNumberOfQuestion;
  private readonly maxNumberQuestions = environment.maxNumberOfQuestion;

  private readonly apiService = inject(ApiService);
  private readonly categoriesStoreService = inject(CategoriesStoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  getRandomCategories(): Observable<QuizCategory[]> {
    showSpinner();
    return this.apiService.fetchCategories().pipe(
      skipWhenCategoriesCached('quizCategories'),
      map(categories => RandomUtils.getRandomItems(categories, this.categoriesNumber).map(
        category => this.enrichCategory(category),
      )),
      tap((categories) => {
        this.categoriesStoreService.addCategories(categories);
      }),
      catchError(this.errorHandlerService.handleError),
      finalize(() => {
        hideSpinner();
      }),
    );
  }

  private enrichCategory(category: QuizCategory): QuizCategory {
    return {
      ...category,
      cardColor: RandomUtils.getRandomColor(),
      numberOfQuestion: RandomUtils.getRandomInt(
        this.minNumberQuestions,
        this.maxNumberQuestions,
      ),
    };
  }
}
