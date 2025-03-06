import {
  Component,
  EventEmitter,
  inject,
  model,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormatDatePipe } from '../../format-date.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TABLE_HEADERS } from '../../constants/table-headers';
import { Router, RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UserService } from '../../../../services/user-service/user.service';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

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
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  @Output() updatedUser = new EventEmitter<User>();
  @Output() deleteUserId = new EventEmitter<number>();

  users = model<User[]>([]);
  allUsers = model<User[]>([]);

  searchControl = new FormControl('');
  tableHeaders = TABLE_HEADERS;
  editingUser: { [key: number]: User } = {};
  searchQuery: string = '';
  globalSearchQuery: string = '';

  ngOnInit(): void {
    this.loadAllUsers();

    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev === curr?.trim()),
      switchMap((value: string | null) => {
        if (!value) {
          return of(this.allUsers());
        }

        const formattedQuery = this.formatQuery(value);
        return formattedQuery
          ? this.userService.getUsersByName(formattedQuery)
          : of([]);
      }),
    )
    .subscribe((users) => {
      this.users.update(() => users);
    });
  }

  loadAllUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.update(() => users);
      this.allUsers.update(() => users);
    });
  }

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

  navigateToUser(id: number): void {
    this.router.navigate([`admin/${id}`]);
  }

  private formatQuery(query: string): string {
    if (!query.trim()) {
      return '';
    }
    return (
      query.trim().charAt(0).toUpperCase() + query.trim().slice(1).toLowerCase()
    );
  }
}
