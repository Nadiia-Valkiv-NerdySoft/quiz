import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { mockCategories } from '../../shared/mocks/quiz-categories.mock';

@Component({
  selector: 'quiz-catalog',
  standalone: true,
  imports: [ UiButtonComponent, UiQuizCardComponent ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  categories = mockCategories;
}
