import { DestroyRef, inject, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormatDatePipe } from '../../format-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserFormDialogService } from '../../../../services/user-form-dialog-service/user-form-dialog.service';

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
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);
  private userFormDialogService = inject(UserFormDialogService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  //@ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  tableHeaders = TABLE_HEADERS;
  displayedColumns: string[] = [
    'no',
    'first_name',
    'last_name',
    'email',
    'dob',
    'interests',
    'action',
  ];

  dataSource = new MatTableDataSource<User>([]);

  ngOnInit(): void {
    this.loadAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadAllUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  deleteUser(id: number): void {
    this.userService
    .deleteUser(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (user: { id: number }) => user.id !== id,
      );
    });
  }

  createUser(newUser: User): void {
    this.userService
    .createUser(newUser)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((createdUser) => {
      this.dataSource.data = [ ...this.dataSource.data, createdUser ];
    });
  }

  updateUser(user: User): void {
    this.userService
    .updateUser(user)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (updatedUser) => {
        const index = this.dataSource.data.findIndex(
          user => user.id === updatedUser.id,
        );
        if (index !== -1) {
          this.dataSource.data[index] = updatedUser;
          this.dataSource.data = [...this.dataSource.data];
        }
      },
    });
  }

  navigateToUser(id: number): void {
    this.router.navigate([`admin/${id}`]);
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef = this.userFormDialogService.openUserDialog(user);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.updateUser(result);
      }
    });
  }

  getRowNumber(index: number): number {
    return this.paginator.pageIndex * this.paginator.pageSize + index + 1;
  }

  search(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
