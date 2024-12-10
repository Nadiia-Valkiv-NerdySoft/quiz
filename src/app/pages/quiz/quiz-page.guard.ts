import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizComponent } from './quiz.component';
import { DialogService } from '../../core/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class QuizPageGuard implements CanDeactivate<QuizComponent> {
  dialogService = inject(DialogService);

  canDeactivate(): Observable<boolean> {
    this.dialogService.openConfirmDialog();

    return new Observable((observer) => {
      this.dialogService.confirm$.subscribe(() => {
        observer.next(true);
        observer.complete();
      });

      this.dialogService.cancel$.subscribe(() => {
        observer.next(false);
        observer.complete();
      });
    });
  }
}
