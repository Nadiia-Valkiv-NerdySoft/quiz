import {
  Component,
  inject,
  signal,
  OnInit,
  DestroyRef,
  viewChild,
} from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { UserFormDialogComponent } from './components/add-user/user-form-dialog.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'quiz-admin-panel',
  imports: [
    UsersListComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  usersListComponent = viewChild(UsersListComponent);

  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  users = signal<User[]>([]);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUsers();
  }

  openUserDialog(isUpdateUser: boolean): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      disableClose: true,
      data: isUpdateUser ? { user: this.users()[0] } : undefined,
      panelClass: 'user-dialog-dark',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (isUpdateUser) {
          this.updateUser(result);
        } else {
          this.onUserSaved(result);
        }
      }
    });
  }

  loadUsers(): void {
    this.userService
    .getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: users => this.users.set(users),
    });
  }

  onUserSaved(newUser: User) {
    this.userService
    .updateUser(newUser)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((createdUser) => {
      this.users.update(currentUsers => [ ...currentUsers, createdUser ]);
    });
  }

  updateUser(user: User): void {
    this.userService
    .updateUser(user)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (updatedUser) => {
        this.users.update(currentUsers => currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
      },
      error: () => (this.usersListComponent() as UsersListComponent).onRowEditCancel(
        user,
      ),
    });
  }

  onDeleteUser(id: number): void {
    this.userService
    .deleteUser(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.users.update(currentUsers => currentUsers.filter(user => user.id !== id));
    });
  }
}
