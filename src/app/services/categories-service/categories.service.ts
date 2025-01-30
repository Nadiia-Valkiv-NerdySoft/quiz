import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { RandomizationService } from '../randomization-service/randomization.service';
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
  private readonly randomizationService = inject(RandomizationService);
  private readonly categoriesStoreService = inject(CategoriesStoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  getRandomCategories(): Observable<QuizCategory[]> {
    showSpinner();
    return this.apiService.fetchCategories().pipe(
      skipWhenCategoriesCached('quizCategories'),
      map(categories => this.randomizationService
      .getRandomItems(categories, this.categoriesNumber)
      .map(category => this.enrichCategory(category))),
      tap((categories) => {
        this.categoriesStoreService.addCategories(categories);
      }),
      catchError((error) => {
        return this.errorHandlerService.handleError(error);
      }),
      finalize(() => {
        hideSpinner();
      }),
    );
  }

  private enrichCategory(category: QuizCategory): QuizCategory {
    return {
      ...category,
      cardColor: this.randomizationService.getRandomColor(),
      numberOfQuestion: this.randomizationService.getRandomInt(
        this.minNumberQuestions,
        this.maxNumberQuestions,
      ),
    };
  }
}
