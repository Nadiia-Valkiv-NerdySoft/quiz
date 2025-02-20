import {
  Component,
  inject,
  signal,
  ViewChild,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'quiz-admin-panel',
  imports: [ SvgIconComponent, AddUserComponent, UsersListComponent ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  @ViewChild(UsersListComponent) usersListComponent!: UsersListComponent;

  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  users = signal<User[]>([]);
  isFormVisible = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
    .getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: users => this.users.set(users),
    });
  }

  toggleForm(): void {
    this.isFormVisible.update(current => !current);
  }

  onUserSaved(newUser: User) {
    this.userService
    .updateUser(newUser)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.toggleForm();
      this.users.update(currentUsers => [ ...currentUsers, newUser ]);
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
      error: () => this.usersListComponent.onRowEditCancel(user),
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
