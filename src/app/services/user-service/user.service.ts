import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private errorHandlerService = inject(ErrorHandlerService);

  private readonly baseUserUrl = environment.baseUserUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUserUrl}/users`).pipe(
      map(users => users),
      catchError(this.errorHandlerService.handleError),
    );
  }

  createUser(user: User): Observable<User> {
    return this.http
    .post<User>(`${this.baseUserUrl}/users`, user)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  deleteUser(userId: number): Observable<void> {
    return this.http
    .delete<void>(`${this.baseUserUrl}/users/${userId}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  updateUser(user: User): Observable<User> {
    return this.http
    .put<User>(`${this.baseUserUrl}/users/${user.id}`, user)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  patchUser(userId: number, partialUser: Partial<User>): Observable<User> {
    return this.http
    .patch<User>(`${this.baseUserUrl}/users/${userId}`, partialUser)
    .pipe(catchError(this.errorHandlerService.handleError));
  }
}
