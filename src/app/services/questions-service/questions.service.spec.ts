import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { QuestionApiResponse } from '../../shared/models/question-api-response.model';
import { Question } from '../../shared/models/question.model';
import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  let questionsService: QuestionsService;
  let apiService: jest.Mocked<ApiService>;
  let errorHandlerService: jest.Mocked<ErrorHandlerService>;

  const mockQuestionApiResponse: QuestionApiResponse = {
    category: 'Science',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: [ 'London', 'Berlin', 'Madrid' ],
  };

  const mockQuestion: Question = {
    ...mockQuestionApiResponse,
    answers: [ 'London', 'Berlin', 'Madrid', 'Paris' ],
  };

  beforeEach(() => {
    const apiServiceMock = {
      fetchQuestions: jest.fn(),
    };

    const errorHandlerServiceMock = {
      handleError: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        QuestionsService,
        { provide: ApiService, useValue: apiServiceMock },
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
      ],
    });

    questionsService = TestBed.inject(QuestionsService);
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    errorHandlerService = TestBed.inject(
      ErrorHandlerService,
    ) as jest.Mocked<ErrorHandlerService>;
  });

  describe('getQuestions', () => {
    it('should return transformed questions when API call is successful', (done) => {
      // Arrange
      const amount = 1;
      const id = 123;
      apiService.fetchQuestions.mockReturnValue(of([mockQuestionApiResponse]));

      // Act
      questionsService.getQuestions(amount, id).subscribe({
        next: (questions) => {
          // Assert
          expect(questions.length).toBe(1);
          expect(questions[0]).toEqual(mockQuestion);
          expect(apiService.fetchQuestions).toHaveBeenCalledWith(id, amount);
          expect(apiService.fetchQuestions).toHaveBeenCalledTimes(1);
          done();
        },
        error: done.fail,
      });
    });

    it('should combine correct and incorrect answers in the transformed question', (done) => {
      // Arrange
      const amount = 1;
      const id = 123;
      apiService.fetchQuestions.mockReturnValue(of([mockQuestionApiResponse]));

      // Act
      questionsService.getQuestions(amount, id).subscribe({
        next: (questions) => {
          // Assert
          const question = questions[0];
          expect(question.answers).toContain(
            mockQuestionApiResponse.correct_answer,
          );
          mockQuestionApiResponse.incorrect_answers.forEach((answer) => {
            expect(question.answers).toContain(answer);
          });
          expect(question.answers?.length).toBe(
            mockQuestionApiResponse.incorrect_answers.length + 1,
          );
          done();
        },
        error: done.fail,
      });
    });

    it('should handle errors using ErrorHandlerService', (done) => {
      // Arrange
      const amount = 1;
      const id = 123;
      const error = new Error('API Error');
      const handledError = new Error('Handled Error');

      apiService.fetchQuestions.mockReturnValue(throwError(() => error));
      errorHandlerService.handleError.mockReturnValue(
        throwError(() => handledError),
      );

      // Act
      questionsService.getQuestions(amount, id).subscribe({
        error: (err) => {
          // Assert
          expect(errorHandlerService.handleError).toHaveBeenCalledWith(error);
          expect(err).toBe(handledError);
          done();
        },
      });
    });
  });
});
