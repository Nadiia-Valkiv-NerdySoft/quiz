import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';
import { UiSpinnerComponent } from '../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { isLoading$ } from '../../store/categories.store';
import { UiErrorNotificationComponent } from '../../shared/ui-kit/ui-error-notification/ui-error-notification.component';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories-service/categories.service';
import { CategoriesStoreService } from '../../services/categories-store-service/categories-store.service';
import { ErrorHandlerService } from '../../services/error-handler-service/error-handler.service';
import { RandomizationService } from '../../services/randomization-service/randomization.service';

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
