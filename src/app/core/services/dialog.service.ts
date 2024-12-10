import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private quizFinishedStatus = false;
  private openDialogSubject = new Subject<void>();

  status$ = new Subject<boolean>();
  openDialog$ = this.openDialogSubject.asObservable();

  setQuizFinished(status: boolean): void {
    this.quizFinishedStatus = status;
  }

  isQuizFinished(): boolean {
    return this.quizFinishedStatus;
  }

  openConfirmDialog(): void {
    this.openDialogSubject.next();
  }

  setStatus(status: boolean): void {
    this.status$.next(status);
  }
}
