import {
  Component,
  inject,
  signal,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { SvgIconComponent } from 'angular-svg-icon';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'quiz-admin-panel',
  imports: [ SvgIconComponent, AddUserComponent, UsersListComponent ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  @ViewChild(UsersListComponent) usersListComponent!: UsersListComponent;

  private userService = inject(UserService);
  private subscription: Subscription | null = null;

  users = signal<User[]>([]);
  isFormVisible = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: users => this.users.set(users),
    });
  }

  toggleForm(): void {
    this.isFormVisible.update(current => !current);
  }

  onUserSaved(newUser: User) {
    this.subscription = this.userService.updateUser(newUser).subscribe(() => {
      this.toggleForm();
      this.users.update(currentUsers => [ ...currentUsers, newUser ]);
    });
  }

  updateUser(user: User): void {
    this.subscription = this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        this.users.update(currentUsers => currentUsers.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      },
      error: () => this.usersListComponent.onRowEditCancel(user),
    });
  }

  onDeleteUser(id: number): void {
    this.subscription = this.userService.deleteUser(id).subscribe(() => {
      this.users.update(currentUsers => currentUsers.filter(user => user.id !== id));
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
