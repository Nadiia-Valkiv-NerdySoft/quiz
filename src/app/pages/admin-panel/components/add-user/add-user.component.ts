import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user-service/user.service';
import { User } from '../../../../shared/models/user.model';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'quiz-add-user',
  imports: [
    ReactiveFormsModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  @Output() userSaved = new EventEmitter<User>();
  @Output() toggleForm = new EventEmitter<void>();

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private isSubmitting = signal(false);

  userForm: FormGroup = this.fb.group({
    first_name: [ '', Validators.required ],
    last_name: [ '', Validators.required ],
    email: [ '', [ Validators.required, Validators.email ]],
    dob: [ '', Validators.required ],
    interests: [ '', Validators.required ],
  });

  onSubmit(): void {
    if (this.userForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      const newUser: User = { ...this.userForm.value };
      this.userService.createUser(newUser).subscribe(
        (user) => {
          this.userSaved.emit(user);
          this.isSubmitting.set(false);
        },
        () => {
          this.isSubmitting.set(false);
          this.userForm.reset();
        },
      );
    }
  }

  closeForm(): void {
    this.toggleForm.emit();
    this.userForm.reset();
  }
}
