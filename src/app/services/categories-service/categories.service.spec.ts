import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api-service/api.service';
import { CategoriesStoreService } from '../categories-store-service/categories-store.service';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';
import { RandomUtils } from '../../utils/random';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from './categories.service';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { QuizCardColors } from '../../pages/catalog/components/quiz-card/quiz-card-colors.enums';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let apiService: jest.Mocked<ApiService>;
  let categoriesStoreService: jest.Mocked<CategoriesStoreService>;
  let errorHandlerService: jest.Mocked<ErrorHandlerService>;

  const mockCategories: QuizCategory[] = [
    {
      id: '1',
      name: 'Category 1',
      cardColor: QuizCardColors.ERROR,
      numberOfQuestion: 5,
    },
    {
      id: '2',
      name: 'Category 2',
      cardColor: QuizCardColors.ERROR,
      numberOfQuestion: 5,
    },
  ];

  beforeEach(() => {
    RandomUtils.getRandomItems = jest.fn().mockReturnValue(mockCategories);
    RandomUtils.getRandomColor = jest.fn().mockReturnValue('error');
    RandomUtils.getRandomInt = jest.fn().mockReturnValue(5);
    const apiServiceMock = {
      fetchCategories: jest.fn(),
    };

    const categoriesStoreServiceMock = {
      addCategories: jest.fn(),
      getCategories: jest.fn().mockReturnValue(of(mockCategories)),
    };

    const errorHandlerServiceMock = {
      handleError: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CategoriesService,
        { provide: ApiService, useValue: apiServiceMock },
        {
          provide: CategoriesStoreService,
          useValue: categoriesStoreServiceMock,
        },
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
      ],
    });

    categoriesService = TestBed.inject(CategoriesService);
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;

    categoriesStoreService = TestBed.inject(
      CategoriesStoreService,
    ) as jest.Mocked<CategoriesStoreService>;
    errorHandlerService = TestBed.inject(
      ErrorHandlerService,
    ) as jest.Mocked<ErrorHandlerService>;
  });

  describe('getRandomCategories', () => {
    it('should return random categories when API call is successful', (done) => {
      // Arrange
      apiService.fetchCategories.mockReturnValue(of(mockCategories));
      // Act
      categoriesService.getRandomCategories().subscribe({
        next: (categories) => {
          // Assert
          expect(categories).toEqual(mockCategories);
          done();
        },
      });
    });

    it('should handle errors from api using ErrorHandlerService', (done) => {
      // Arrange
      const error = new HttpErrorResponse({
        error: 'API is down',
        status: 500,
        statusText: 'Internal Server Error',
      });
      apiService.fetchCategories.mockReturnValue(throwError(() => error));
      errorHandlerService.handleError.mockReturnValue(throwError(() => error));
      // Act
      categoriesService.getRandomCategories().subscribe({
        error: (err) => {
          // Assert
          expect(errorHandlerService.handleError).toHaveBeenCalled();
          expect(errorHandlerService.handleError.mock.calls[0][0]).toEqual(
            error,
          );
          expect(err).toEqual(error);
          done();
        },
      });
    });

    it('should add random categories to the store', (done) => {
      // Arrange
      apiService.fetchCategories.mockReturnValue(of(mockCategories));
      jest.spyOn(RandomUtils, 'getRandomItems').mockReturnValue(mockCategories);

      // Act
      categoriesService.getRandomCategories().subscribe({
        next: () => {
          // Assert
          expect(categoriesStoreService.addCategories).toHaveBeenCalledWith(
            mockCategories,
          );
          done();
        },
      });
    });
  });
});
