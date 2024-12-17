import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { filter, first, Observable, of } from 'rxjs';
import { QuizComponent } from './quiz.component';
import { DialogService } from '../../core/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class QuizPageGuard implements CanDeactivate<QuizComponent> {
  dialogService = inject(DialogService);

  canDeactivate(): Observable<boolean> {
    if (this.dialogService.canLeavePage()) {
      return of(true);
    }

    this.dialogService.openConfirmDialog();

    return this.dialogService.status$.pipe(
      filter(status => status !== null),
      first(),
    );
  }
}
