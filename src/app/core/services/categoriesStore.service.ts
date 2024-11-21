import { Injectable } from '@angular/core';
import { selectAllEntities, addEntities } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { quizCategoriesStore } from '../../store/categories.store';

@Injectable({
  providedIn: 'root',
})
export class QuizCategoriesStoreService {
  getCategories(): Observable<QuizCategory[]> {
    return quizCategoriesStore.pipe(selectAllEntities());
  }

  addCategories(categories: QuizCategory[]): void {
    quizCategoriesStore.update(addEntities(categories));
  }
}
