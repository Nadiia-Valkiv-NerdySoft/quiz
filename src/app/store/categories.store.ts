import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { QuizCategory } from '../shared/models/quiz-category.model';
import {
  createRequestsCacheOperator,
  withRequestsCache,
} from '@ngneat/elf-requests';

export const quizCategoriesStore = createStore(
  { name: 'quizCategories' },
  withEntities<QuizCategory>(),
  withRequestsCache<'quizCategories'>(),
);

export const skipWhenCategoriesCached
  = createRequestsCacheOperator(quizCategoriesStore);
