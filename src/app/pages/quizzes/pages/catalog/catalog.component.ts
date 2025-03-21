import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CategoriesService } from '../../../../services/categories-service/categories.service';
import { CategoriesStoreService } from '../../../../services/categories-store-service/categories-store.service';
import { ErrorHandlerService } from '../../../../services/error-handler-service/error-handler.service';
import { QuizCategory } from '../../../../shared/models/quiz-category.model';
import { UiButtonComponent } from '../../../../shared/ui-kit/ui-button/ui-button.component';
import { UiErrorNotificationComponent } from '../../../../shared/ui-kit/ui-error-notification/ui-error-notification.component';
import { UiSpinnerComponent } from '../../../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { isLoading$ } from '../../../../store/categories.store';
import { RandomUtils } from '../../../../utils/random';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';

@Component({
  selector: 'quiz-catalog',
  imports: [
    UiButtonComponent,
    QuizCardComponent,
    AsyncPipe,
    UiSpinnerComponent,
    UiErrorNotificationComponent,
  ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
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
      const randomIndex = RandomUtils.getRandomInt(0, categories.length);
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
