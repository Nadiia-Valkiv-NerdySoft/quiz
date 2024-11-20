import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { CategoriesService } from '../../core/services/categories.service';
import { Observable } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'quiz-catalog',
  standalone: true,
  imports: [ UiButtonComponent, UiQuizCardComponent, AsyncPipe ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories$!: Observable<QuizCategory[]>;

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getRandomCategories();
  }
}
