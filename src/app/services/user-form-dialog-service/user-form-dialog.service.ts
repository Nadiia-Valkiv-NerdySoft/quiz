import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../../pages/admin-panel/components/add-user/user-form-dialog.component';
import { User } from '../../shared/models/user.model';

@Injectable()
export class UserFormDialogService {
  readonly dialog = inject(MatDialog);

  openUserDialog(user?: User): MatDialogRef<UserFormDialogComponent, any> {
    return this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: user ? { user: user } : undefined,
      panelClass: 'user-dialog-dark',
    });
  }
}
