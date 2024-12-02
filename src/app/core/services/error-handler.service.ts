import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage$ = new BehaviorSubject<string | null>(null);

  handleError(error: HttpErrorResponse): Observable<never> {
    this.errorMessage$.next(environment.categoriesApiErrorMessage);

    return throwError(() => new Error(error.message));
  }

  getErrorMessage$(): Observable<string | null> {
    return this.errorMessage$.asObservable();
  }

  setError(): void {
    this.errorMessage$.next(
      'This is a simulated error. Please reload the page',
    );
  }

  clearError(): void {
    this.errorMessage$.next(null);
  }
}
