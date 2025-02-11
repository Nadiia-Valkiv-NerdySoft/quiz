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
}
