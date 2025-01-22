import { Routes } from '@angular/router';
import { QuizPageGuard } from './pages/quiz/quiz-page.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(c => c.MainComponent),
    pathMatch: 'full',
  },
  {
    path: 'catalog',
    loadComponent: () => import('./pages/catalog/catalog.component').then(
      c => c.CatalogComponent,
    ),
  },
  {
    path: 'quiz/:id/:questions',
    loadComponent: () => import('./pages/quiz/quiz.component').then(c => c.QuizComponent),
    canDeactivate: [QuizPageGuard],
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics.component').then(
      c => c.StatisticsComponent,
    ),
  },
];
