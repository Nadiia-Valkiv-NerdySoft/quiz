/* eslint-disable no-console */
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { RandomizationService } from './randomization.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly categoriesUrl = environment.categoriesUrl;
  private readonly categoriesNumber = environment.numberOfQuizCategories;
  private readonly minNumberQuestions = environment.minNumberOfQuestion;
  private readonly maxNumberQuestions = environment.maxNumberOfQuestion;

  private readonly http = inject(HttpClient);
  private readonly randomizationService = inject(RandomizationService);

  getRandomCategories(): Observable<QuizCategory[]> {
    return this.fetchCategories().pipe(
      map(categories => this.randomizationService
      .getRandomItems(categories, this.categoriesNumber)
      .map(category => this.enrichCategory(category))),
    );
  }

  private fetchCategories(): Observable<QuizCategory[]> {
    return this.http
    .get<{ trivia_categories: QuizCategory[] }>(this.categoriesUrl)
    .pipe(
      map(response => response.trivia_categories),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return of([]);
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
