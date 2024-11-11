import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
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
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.component').then(c => c.QuizComponent),
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics.component').then(
      c => c.StatisticsComponent,
    ),
  },
  { path: '**', redirectTo: 'home' },
];
