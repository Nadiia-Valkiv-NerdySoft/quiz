import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormatDatePipe } from '../../format-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TABLE_HEADERS } from '../../constants/table-headers';

@Component({
  selector: 'quiz-users-list',
  imports: [
    FormatDatePipe,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  @Output() updatedUser = new EventEmitter<User>();
  @Output() deleteUserId = new EventEmitter<number>();

  @Input() users!: User[];

  tableHeaders = TABLE_HEADERS;
  editingUser: { [key: number]: User } = {};

  onRowEditInit(user: User): void {
    this.editingUser[user.id] = { ...user };
  }

  onRowEditSave(user: User): void {
    this.updatedUser.emit(user);
  }

  onRowEditCancel(user: User): void {
    if (this.editingUser[user.id]) {
      Object.assign(user, this.editingUser[user.id]);
      delete this.editingUser[user.id];
    }
  }

  deleteUser(id: number): void {
    this.deleteUserId.emit(id);
  }
}
