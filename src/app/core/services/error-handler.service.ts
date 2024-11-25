import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage$ = new BehaviorSubject<string | null>(null);

  handleError(error: HttpErrorResponse) {
    this.errorMessage$.next(environment.categoriesApiErrorMessage);

    return throwError(() => new Error(error.message));
  }

  getErrorMessage$() {
    return this.errorMessage$.asObservable();
  }

  setError(): void {
    this.errorMessage$.next(
      'This is a simulated error. Please reload the page',
    );
  }
}
