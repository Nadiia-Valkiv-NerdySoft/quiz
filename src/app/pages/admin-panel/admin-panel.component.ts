import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user-service/user.service';
import { FormatDatePipe } from './format-date.pipe';
import { SvgIconComponent } from 'angular-svg-icon';
import { TABLE_HEADERS } from './constants/table-headers';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'quiz-admin-panel',
  imports: [
    FormatDatePipe,
    SvgIconComponent,
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  tableHeaders = TABLE_HEADERS;
  formGroups: { [key: number]: FormGroup } = {};
  editingUser: { [key: number]: User } = {};

  users = signal<User[]>([]);
  isFormVisible = signal(false);
  userForm: FormGroup = this.fb.group({
    first_name: [ '', Validators.required ],
    last_name: [ '', Validators.required ],
    email: [ '', [ Validators.required, Validators.email ]],
    dob: [ '', Validators.required ],
    interests: [ '', Validators.required ],
  });

  private isSubmitting = signal(false);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  toggleForm() {
    this.isFormVisible.update(current => !current);
    if (!this.isFormVisible()) { this.userForm.reset(); }
  }

  onSubmit() {
    if (this.userForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      const newUser: User = { ...this.userForm.value };
      this.userService.createUser(newUser).subscribe(
        (user) => {
          this.users.update(currentUsers => [ ...currentUsers, user ]);
          this.toggleForm();
          this.isSubmitting.set(false);
        },
        () => {
          this.isSubmitting.set(false);
          this.userForm.reset();
        },
      );
    }
  }

  deleteUser(id: number, event: Event): void {
    event.stopPropagation();
    this.userService.deleteUser(id).subscribe(() => {
      this.users.update(currentUsers => currentUsers.filter(user => user.id !== id));
      delete this.formGroups[id];
    });
  }

  onRowEditInit(user: User) {
    this.editingUser[user.id] = { ...user };
  }

  onRowEditSave(user: User) {
    this.userService.updateUser(user).subscribe(
      (updatedUser) => {
        this.users.update(currentUsers => currentUsers.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        delete this.editingUser[user.id];
      },
      () => this.onRowEditCancel(user),
    );
  }

  onRowEditCancel(user: User) {
    if (this.editingUser[user.id]) {
      Object.assign(user, this.editingUser[user.id]);
      delete this.editingUser[user.id];
    }
  }
}
