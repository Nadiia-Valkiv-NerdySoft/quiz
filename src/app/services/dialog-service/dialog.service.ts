import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DialogState } from '../../shared/ui-kit/ui-navigation-confirm-dialog/dialog-state.interface';
import { defaultDialog } from '../../shared/ui-kit/ui-navigation-confirm-dialog/dialog-states';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private canLeavePageStatus = false;
  private openDialogSubject = new Subject<DialogState>();
  private statusSubject = new Subject<boolean>();
  private dialogState: DialogState = defaultDialog;

  status$: Observable<boolean> = this.statusSubject.asObservable();
  openDialog$: Observable<DialogState> = this.openDialogSubject.asObservable();

  setCanPageLeaveStatus(status: boolean): void {
    this.canLeavePageStatus = status;
  }

  setDialogState(state: DialogState): void {
    this.dialogState = state;
  }

  canLeavePage(): boolean {
    return this.canLeavePageStatus;
  }

  openConfirmDialog(): void {
    this.openDialogSubject.next({
      ...this.dialogState,
      isOpen: true,
    });
  }

  setStatus(status: boolean): void {
    this.statusSubject.next(status);
  }

  resetDialog(): void {
    this.canLeavePageStatus = false;
    this.statusSubject = new Subject<boolean>();
  }
}
