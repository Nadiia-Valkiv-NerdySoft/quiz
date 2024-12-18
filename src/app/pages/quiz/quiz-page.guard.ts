import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { QuizComponent } from './quiz.component';
import { DialogService } from '../../core/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class QuizPageGuard implements CanDeactivate<QuizComponent> {
  private dialogService = inject(DialogService);

  canDeactivate(): Observable<boolean> | boolean {
    if (this.dialogService.canLeavePage()) {
      return true;
    }

    return this.openConfirmationDialog();
  }

  private openConfirmationDialog(): Observable<boolean> {
    this.dialogService.openConfirmDialog();
    return this.dialogService.status$.pipe(
      filter(status => status !== null),
      first(),
    );
  }
}
