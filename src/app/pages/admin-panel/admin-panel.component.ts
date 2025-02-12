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

@Component({
  selector: 'quiz-admin-panel',
  standalone: true,
  imports: [ FormatDatePipe, SvgIconComponent, ReactiveFormsModule ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanelComponent implements OnInit {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  tableHeaders = TABLE_HEADERS;
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
      };

      this.userService.createUser(newUser).subscribe(
        (user) => {
          this.users.update(currentUsers => [ ...currentUsers, user ]);
        },
        () => {
          this.isSubmitting.set(false);
          this.userForm.reset();
          this.isSubmitting.set(false);
        },
      );
    }
  }

  deleteUser(id: number, event: Event): void {
    event.stopPropagation();
    this.userService.deleteUser(id).subscribe(() => {
      this.users.update(currentUsers => currentUsers.filter(user => user.id !== id));
    });
  }

  updateUser(user: User, event: Event): void {
    event.stopPropagation();
    //  It will be implemented in the next task.
  }
}
