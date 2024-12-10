import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private openDialogSubject = new Subject<void>();
  confirm$ = new Subject<void>();
  cancel$ = new Subject<void>();

  openDialog$ = this.openDialogSubject.asObservable();

  openConfirmDialog() {
    this.openDialogSubject.next();
  }

  confirm() {
    this.confirm$.next();
  }

  cancel() {
    this.cancel$.next();
  }
}
