import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { FormatDatePipe } from './format-date.pipe';
import { SvgIconComponent } from 'angular-svg-icon';
import { TABLE_HEADERS } from './constants/table-headers';

@Component({
  selector: 'quiz-admin-panel',
  standalone: true,
  imports: [ FormatDatePipe, SvgIconComponent ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  private userService = inject(UserService);

  tableHeaders = TABLE_HEADERS;
  users = signal<User[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  deleteUser(id: number, event: Event): void {
    event.stopPropagation();
    this.users.update(users => users.filter(user => user.id !== id));
  }

  updateUser(user: User, event: Event): void {
    event.stopPropagation();
  }
}
