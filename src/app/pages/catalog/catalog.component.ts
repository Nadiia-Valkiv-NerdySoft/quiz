import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { CategoriesService } from '../../core/services/categories.service';
import { AsyncPipe } from '@angular/common';
import { CategoriesStoreService } from '../../core/services/categories-store.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'quiz-catalog',
  standalone: true,
  imports: [ UiButtonComponent, UiQuizCardComponent, AsyncPipe ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly categoriesStoreService = inject(CategoriesStoreService);

  categories$!: Observable<any>;

  ngOnInit(): void {
    this.categories$ = this.categoriesStoreService.getCategories().pipe(
      switchMap((categories) => {
        if (!categories || categories.length === 0) {
          return this.categoriesService.getRandomCategories();
        }
        return [categories];
      }),
    );
  }
}
