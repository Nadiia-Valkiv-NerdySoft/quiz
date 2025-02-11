import { Routes } from '@angular/router';
import { quizzesRoutes } from './pages/quizzes/quizzes.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/quizzes/quizzes.component').then(
      c => c.QuizzesComponent,
    ),
    children: quizzesRoutes,
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin-panel/admin-panel.component').then(
      c => c.AdminPanelComponent,
    ),
  },
];
