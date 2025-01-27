import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerService],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  describe('handleError', () => {
    it('should set error message from environment and return an observable error', (done) => {
      // Arrange
      const httpError = new HttpErrorResponse({
        error: 'test error',
        status: 404,
        statusText: 'Not Found',
      });

      // Act & Assert
      service.errorMessage$.subscribe((message) => {
        expect(message).toBe(environment.apiErrorMessage);
      });

      // Act & Assert
      const result = service.handleError(httpError);

      result.subscribe({
        error: (error) => {
          expect(error.message).toBe(httpError.message);
          done();
        },
      });
    });
  });

  describe('getErrorMessage$', () => {
    it('should return an observable of error messages', (done) => {
      // Arrange
      const testError = 'Test error message';

      // Act
      service.errorMessage$.next(testError);

      // Assert
      service.getErrorMessage$().subscribe((message) => {
        expect(message).toBe(testError);
        done();
      });
    });
  });

  describe('setError', () => {
    it('should set a simulated error message', (done) => {
      // Arrange
      const expectedError = 'This is a simulated error. Please reload the page';

      // Act
      service.setError();

      // Assert
      service.errorMessage$.subscribe((message) => {
        expect(message).toBe(expectedError);
        done();
      });
    });
  });

  describe('clearError', () => {
    it('should clear the error message', (done) => {
      // Arrange
      service.setError();

      // Act
      service.clearError();

      // Assert
      service.errorMessage$.subscribe((message) => {
        expect(message).toBeNull();
        done();
      });
    });
  });

  describe('initial state', () => {
    it('should have null as initial error message', (done) => {
      // Act & Assert
      service.errorMessage$.subscribe((message) => {
        expect(message).toBeNull();
        done();
      });
    });
  });
});
