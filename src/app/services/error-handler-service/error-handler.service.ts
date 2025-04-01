import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  errorMessage$ = new BehaviorSubject<string | null>(null);

  handleError(error: HttpErrorResponse): Observable<never> {
    this.errorMessage$.next(environment.apiErrorMessage);

    return throwError(() => new Error(error.message));
  }

  handleAuthError(error: FirebaseError): Observable<never> {
    let errorMessage
      = 'An unknown error occurred with Firebase authentication.';

    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Invalid credentials provided.';
    }

    return throwError(() => new Error(errorMessage));
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
