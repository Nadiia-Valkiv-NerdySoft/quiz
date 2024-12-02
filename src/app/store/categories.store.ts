import { createStore, select, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { QuizCategory } from '../shared/models/quiz-category.model';
import {
  createRequestsCacheOperator,
  withRequestsCache,
} from '@ngneat/elf-requests';

export interface QuizCategoriesState {
  isLoading: boolean;
}

export const quizCategoriesStore = createStore(
  { name: 'quizCategories' },
  withEntities<QuizCategory>(),
  withRequestsCache<'quizCategories'>(),
  withProps<QuizCategoriesState>({ isLoading: false }),
);

export const skipWhenCategoriesCached
  = createRequestsCacheOperator(quizCategoriesStore);

export const showSpinner = () => quizCategoriesStore.update(state => ({ ...state, isLoading: true }));

export const hideSpinner = () => quizCategoriesStore.update(state => ({ ...state, isLoading: false }));

export const isLoading$ = quizCategoriesStore.pipe(
  select(state => state.isLoading),
);
