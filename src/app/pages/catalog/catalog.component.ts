import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { CategoriesService } from '../../core/services/categories.service';
import { AsyncPipe } from '@angular/common';
import { CategoriesStoreService } from '../../core/services/categories-store.service';
import { Observable } from 'rxjs';
import { UiSpinnerComponent } from '../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { isLoading$ } from '../../store/categories.store';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { UiErrorNotificationComponent } from '../../shared/ui-kit/ui-error-notification/ui-error-notification.component';

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
  private readonly categoriesStoreService = inject(CategoriesStoreService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  categories$!: Observable<any>;
  isLoading$ = isLoading$;
  errorMessage$ = this.errorHandlerService.getErrorMessage$();

  ngOnInit(): void {
    this.categoriesService.getRandomCategories().subscribe();

    this.categories$ = this.categoriesStoreService.getCategories();
  }

  simulateError(): void {
    this.errorHandlerService.setError();
  }
}
