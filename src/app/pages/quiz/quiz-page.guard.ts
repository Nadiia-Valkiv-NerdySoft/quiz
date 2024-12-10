import { CanDeactivateFn } from '@angular/router';

export const quizPageGuard: CanDeactivateFn<unknown> = () => {
  return false;
};
