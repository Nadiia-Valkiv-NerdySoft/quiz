import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUserRole().pipe(
    take(1),
    map((role) => {
      if (role === 'admin') {
        return true;
      }
      // eslint-disable-next-line no-console
      console.warn('Access denied - Admins only');
      router.navigate(['/login']);
      return false;
    }),
  );
};
