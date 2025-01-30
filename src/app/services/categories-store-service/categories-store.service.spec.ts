import { TestBed } from '@angular/core/testing';
import { QuizCategory } from '../../shared/models/quiz-category.model';
import { addEntities, selectAllEntities } from '@ngneat/elf-entities';
import { quizCategoriesStore } from '../../store/categories.store';
import { CategoriesStoreService } from './categories-store.service';

describe('CategoriesStoreService', () => {
  let service: CategoriesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesStoreService],
    });
    service = TestBed.inject(CategoriesStoreService);
  });

  afterEach(() => {
    quizCategoriesStore.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all categories from the store', (done) => {
    const mockCategories: QuizCategory[] = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];

    quizCategoriesStore.update(addEntities(mockCategories));

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
      done();
    });
  });

  it('should add categories to the store', (done) => {
    const mockCategories: QuizCategory[] = [
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ];

    service.addCategories(mockCategories);

    quizCategoriesStore.pipe(selectAllEntities()).subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
      done();
    });
  });
});
