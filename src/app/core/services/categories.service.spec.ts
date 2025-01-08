import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { CategoriesStoreService } from './categories-store.service';
import { CategoriesService } from './categories.service';
import { ErrorHandlerService } from './error-handler.service';
import { RandomizationService } from './randomization.service';
import { of, throwError } from 'rxjs';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let apiService: jest.Mocked<ApiService>;
  let randomizationService: jest.Mocked<RandomizationService>;
  let categoriesStoreService: jest.Mocked<CategoriesStoreService>;
  let errorHandlerService: jest.Mocked<ErrorHandlerService>;

  const mockCategories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ];

  beforeEach(() => {
    const apiServiceMock = {
      fetchCategories: jest.fn(),
    };

    const randomizationServiceMock = {
      getRandomItems: jest.fn(),
      getRandomColor: jest.fn(),
      getRandomInt: jest.fn(),
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
        { provide: RandomizationService, useValue: randomizationServiceMock },
        {
          provide: CategoriesStoreService,
          useValue: categoriesStoreServiceMock,
        },
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
      ],
    });

    categoriesService = TestBed.inject(CategoriesService);
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
    randomizationService = TestBed.inject(
      RandomizationService,
    ) as jest.Mocked<RandomizationService>;
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
      randomizationService.getRandomItems.mockReturnValue(mockCategories);

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
      const error = new Error('API is down');
      const handledError = new Error('Handled Error');
      apiService.fetchCategories.mockReturnValue(throwError(() => error));
      errorHandlerService.handleError.mockReturnValue(
        throwError(() => handledError),
      );
      // Act
      categoriesService.getRandomCategories().subscribe({
        error: (err) => {
          // Assert
          expect(errorHandlerService.handleError).toHaveBeenCalledWith(error);
          expect(err).toEqual(handledError);
          done();
        },
      });
    });

    it('should add random categories to the store', (done) => {
      // Arrange
      apiService.fetchCategories.mockReturnValue(of(mockCategories));
      randomizationService.getRandomItems.mockReturnValue(mockCategories);

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
