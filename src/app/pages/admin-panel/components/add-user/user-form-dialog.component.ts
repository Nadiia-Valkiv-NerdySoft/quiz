import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { User } from '../../../../shared/models/user.model';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DialogData } from '../../dialog-data';

@Component({
  selector: 'quiz-user-form-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.components.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserFormDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  isEditMode!: boolean;

  userForm: FormGroup = this.fb.group({
    first_name: [ '', Validators.required ],
    last_name: [ '', Validators.required ],
    email: [ '', [ Validators.required, Validators.email ]],
    dob: [ '', Validators.required ],
    interests: [ '', Validators.required ],
  });

  ngOnInit() {
    this.isEditMode = !!this.data;
    if (this.isEditMode) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        ...this.userForm.value,
        dob: new Date(this.userForm.value.dob),
      };

      if (this.isEditMode) {
        user.id = this.data.user.id;
      }

      this.dialogRef.close(user);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
