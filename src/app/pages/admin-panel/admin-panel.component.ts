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
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quiz-admin-panel',
  standalone: true,
  imports: [
    FormatDatePipe,
    SvgIconComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  tableHeaders = TABLE_HEADERS;
  users = signal<User[]>([]);
  isFormVisible = signal(false);
  userForm: FormGroup;
  private isSubmitting = signal(false);

  constructor() {
    this.userForm = this.fb.group({
      first_name: [ '', Validators.required ],
      last_name: [ '', Validators.required ],
      email: [ '', [ Validators.required, Validators.email ]],
      dob: [ '', Validators.required ],
      interests: [ '', Validators.required ],
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  toggleForm() {
    this.isFormVisible.update(current => !current);
    if (!this.isFormVisible()) {
      this.userForm.reset();
    }
  }

  onSubmit() {
    if (this.userForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      const newUser: User = {
        ...this.userForm.value,
        id: crypto.randomUUID(),
      };

      this.users.update(currentUsers => [ ...currentUsers, newUser ]);

      this.userForm.reset();
      this.isSubmitting.set(false);
    }
  }

  deleteUser(id: number, event: Event): void {
    event.stopPropagation();
    //  It will be implemented in the next task.
  }

  updateUser(user: User, event: Event): void {
    event.stopPropagation();
    //  It will be implemented in the next task.
  }
}
