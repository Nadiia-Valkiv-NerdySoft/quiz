import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { QuestionApiResponse } from '../../shared/models/question-api-response.model';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ApiService, provideHttpClient(), provideHttpClientTesting() ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch categories', () => {
    const mockCategories: QuizCategory[] = [
      { id: '1', name: 'IT' },
      { id: '2', name: 'AI' },
    ];

    service.fetchCategories().subscribe((categories) => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(environment.categoriesUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ trivia_categories: mockCategories });
  });

  it('should fetch questions', () => {
    const categoryId = 1;
    const numberOfQuestions = 5;
    const mockQuestions: QuestionApiResponse[] = [
      {
        question: 'Question 1',
        correct_answer: 'Answer 1',
        incorrect_answers: [ 'Wrong 1', 'Wrong 2', 'Wrong 3' ],
        category: '',
        difficulty: 'easy',
        type: 'boolean',
      },
      {
        question: 'Question 2',
        correct_answer: 'Answer 2',
        incorrect_answers: [ 'Wrong 1', 'Wrong 2', 'Wrong 3' ],
        category: '',
        difficulty: 'easy',
        type: 'boolean',
      },
    ];

    service
    .fetchQuestions(categoryId, numberOfQuestions)
    .subscribe((questions) => {
      expect(questions.length).toBe(2);
      expect(questions).toEqual(mockQuestions);
    });

    const req = httpMock.expectOne(
      `${environment.questionUrl}?amount=${numberOfQuestions}&category=${categoryId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockQuestions });
  });
});
