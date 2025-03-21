import { Component, inject, viewChild } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormDialogService } from '../../services/user-form-dialog-service/user-form-dialog.service';

@Component({
  selector: 'quiz-admin-panel',
  imports: [
    UsersListComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [UserFormDialogService],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent {
  usersListComponent = viewChild(UsersListComponent);

  private userFormDialogService = inject(UserFormDialogService);
  readonly dialog = inject(MatDialog);

  openUserDialog(): void {
    const dialogRef = this.userFormDialogService.openUserDialog();

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.usersListComponent()?.createUser(result);
      }
    });
  }
}
