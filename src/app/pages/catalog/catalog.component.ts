import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { CategoriesService } from '../../core/services/categories.service';
import { AsyncPipe } from '@angular/common';
import { CategoriesStoreService } from '../../core/services/categories-store.service';
import { Observable, take } from 'rxjs';
import { UiSpinnerComponent } from '../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { isLoading$ } from '../../store/categories.store';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { UiErrorNotificationComponent } from '../../shared/ui-kit/ui-error-notification/ui-error-notification.component';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { Router } from '@angular/router';
import { RandomizationService } from '../../core/services/randomization.service';

@Component({
  selector: 'quiz-catalog',
  standalone: true,
  imports: [
    UiButtonComponent,
    UiQuizCardComponent,
    AsyncPipe,
    UiSpinnerComponent,
    UiErrorNotificationComponent,
  ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly randomizationService = inject(RandomizationService);
  private readonly categoriesStoreService = inject(CategoriesStoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  private readonly router = inject(Router);

  categories$!: Observable<QuizCategory[]>;
  isLoading$ = isLoading$;
  errorMessage$ = this.errorHandlerService.getErrorMessage$();

  ngOnInit(): void {
    this.loadCategories();
  }

  simulateError(): void {
    this.errorHandlerService.setError();
  }

  goToRandomQuiz(): void {
    this.categories$.pipe(take(1)).subscribe((categories) => {
      const randomIndex = this.randomizationService.getRandomInt(
        0,
        categories.length,
      );
      this.router.navigate([
        '/quiz',
        categories[randomIndex].id,
        categories[randomIndex].numberOfQuestion,
      ]);
    });
  }

  reloadCategories(): void {
    this.errorHandlerService.clearError();
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoriesService.getRandomCategories().subscribe();
    this.categories$ = this.categoriesStoreService.getCategories();
  }
}
