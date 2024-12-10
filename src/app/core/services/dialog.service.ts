import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private openDialogSubject = new Subject<void>();
  status$ = new Subject<boolean>();

  openDialog$ = this.openDialogSubject.asObservable();

  openConfirmDialog(): void {
    this.openDialogSubject.next();
  }

  setStatus(status: boolean): void {
    this.status$.next(status);
  }
}
