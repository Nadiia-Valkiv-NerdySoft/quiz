import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { QuizCategory } from '../shared/models/quiz-category.model';

export const quizCategoriesStore = createStore(
  { name: 'quizCategories' },
  withEntities<QuizCategory>(),
);
