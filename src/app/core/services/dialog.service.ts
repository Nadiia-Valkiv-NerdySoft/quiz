import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private canLeavePageStatus = false;
  private openDialogSubject = new Subject<void>();

  status$ = new Subject<boolean>();
  openDialog$ = this.openDialogSubject.asObservable();

  setCanPageLeaveStatus(status: boolean): void {
    this.canLeavePageStatus = status;
  }

  canLeavePage(): boolean {
    return this.canLeavePageStatus;
  }

  openConfirmDialog(): void {
    this.openDialogSubject.next();
  }

  setStatus(status: boolean): void {
    this.status$.next(status);
  }
}
