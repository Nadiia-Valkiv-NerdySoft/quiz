import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { RandomizationService } from './randomization.service';
import { CategoriesStoreService } from './categories-store.service';
import { ApiService } from './api.service';

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

  categories!: QuizCategory[];

  getRandomCategories(): Observable<QuizCategory[]> {
    if (this.categories && this.categories.length > 0) {
      return this.categoriesStoreService.getCategories();
    }

    return this.apiService.fetchCategories().pipe(
      map(categories => this.randomizationService
      .getRandomItems(categories, this.categoriesNumber)
      .map(category => this.enrichCategory(category))),
      tap((categories) => {
        this.categoriesStoreService.addCategories(categories);
        this.categories = categories;
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