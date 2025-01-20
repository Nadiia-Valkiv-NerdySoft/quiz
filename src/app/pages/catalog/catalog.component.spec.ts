import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CatalogComponent } from './catalog.component';
import { CategoriesService } from '../../core/services/categories.service';
import { CategoriesStoreService } from '../../core/services/categories-store.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { provideRouter } from '@angular/router';
import { RandomizationService } from '../../core/services/randomization.service';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';
import { UiSpinnerComponent } from '../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { UiErrorNotificationComponent } from '../../shared/ui-kit/ui-error-notification/ui-error-notification.component';
import { By } from '@angular/platform-browser';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';

describe('CatalogComponent Template', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let categoriesServiceMock: any;
  let categoriesStoreServiceMock: any;
  let errorHandlerServiceMock: any;
  let randomizationServiceMock: any;
  let errorMessage$: BehaviorSubject<string | null>;
  let isLoading$: BehaviorSubject<boolean>;
  let categories$: BehaviorSubject<any[]>;

  beforeEach(async() => {
    errorMessage$ = new BehaviorSubject<string | null>(null);
    isLoading$ = new BehaviorSubject<boolean>(false);
    categories$ = new BehaviorSubject<any[]>([]);

    categoriesServiceMock = {
      getRandomCategories: jest.fn().mockReturnValue(of([])),
    };

    categoriesStoreServiceMock = {
      getCategories: jest.fn().mockReturnValue(categories$.asObservable()),
    };

    errorHandlerServiceMock = {
      getErrorMessage$: jest.fn().mockReturnValue(errorMessage$.asObservable()),
      clearError: jest.fn(),
    };

    randomizationServiceMock = {
      getRandomInt: jest.fn().mockReturnValue(0),
    };

    await TestBed.configureTestingModule({
      imports: [
        UiButtonComponent,
        UiQuizCardComponent,
        UiSpinnerComponent,
        UiErrorNotificationComponent,
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAngularSvgIcon(),
        { provide: CategoriesService, useValue: categoriesServiceMock },
        {
          provide: CategoriesStoreService,
          useValue: categoriesStoreServiceMock,
        },
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
        { provide: RandomizationService, useValue: randomizationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    component.isLoading$ = isLoading$.asObservable();
    fixture.detectChanges();
  });

  it('should display the heading "Choose your Quiz."', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.textContent.trim()).toContain('Choose your');
    expect(heading.nativeElement.textContent.trim()).toContain('Quiz');
  });

  it('should display spinner when loading', () => {
    isLoading$.next(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('quiz-ui-spinner'));
    const quizCards = fixture.debugElement.queryAll(By.css('quiz-quiz-card'));
    const errorNotification = fixture.debugElement.query(
      By.css('quiz-ui-error-notification'),
    );

    expect(spinner).toBeTruthy();
    expect(quizCards.length).toBe(0);
    expect(errorNotification).toBeFalsy();
  });

  it('should display quiz cards when data is loaded', () => {
    const mockCategories = [
      { id: '1', numberOfQuestion: 10, title: 'Quiz 1' },
      { id: '2', numberOfQuestion: 15, title: 'Quiz 2' },
    ];

    isLoading$.next(false);
    categories$.next(mockCategories);
    fixture.detectChanges();

    const quizCards = fixture.debugElement.queryAll(By.css('quiz-quiz-card'));
    const spinner = fixture.debugElement.query(By.css('quiz-ui-spinner'));
    const errorNotification = fixture.debugElement.query(
      By.css('quiz-ui-error-notification'),
    );

    expect(quizCards.length).toBe(2);
    expect(spinner).toBeFalsy();
    expect(errorNotification).toBeFalsy();
  });

  it('should display error notification when error occurs', () => {
    isLoading$.next(false);
    errorMessage$.next('Test error message');
    fixture.detectChanges();

    const errorNotification = fixture.debugElement.query(
      By.css('quiz-ui-error-notification'),
    );
    const spinner = fixture.debugElement.query(By.css('quiz-ui-spinner'));
    const quizCards = fixture.debugElement.queryAll(By.css('quiz-quiz-card'));

    expect(errorNotification).toBeTruthy();
    expect(spinner).toBeFalsy();
    expect(quizCards.length).toBe(0);
  });

  it('should display "I\'m lucky" button when categories are loaded', () => {
    isLoading$.next(false);
    categories$.next([{ id: '1', numberOfQuestion: 10 }]);
    fixture.detectChanges();

    const luckyButton = fixture.debugElement.query(By.css('quiz-ui-button'));
    expect(luckyButton).toBeTruthy();
    expect(luckyButton.nativeElement.textContent.trim()).toBe('I\'m lucky');
  });

  it('should call reloadCategories when try again button is clicked', () => {
    jest.spyOn(component, 'reloadCategories');
    isLoading$.next(false);
    errorMessage$.next('Test error');
    fixture.detectChanges();

    const errorNotification = fixture.debugElement.query(
      By.css('quiz-ui-error-notification'),
    );
    errorNotification.triggerEventHandler('tryAgainButtonClick', null);

    expect(component.reloadCategories).toHaveBeenCalled();
  });

  it('should call goToRandomQuiz when lucky button is clicked', () => {
    jest.spyOn(component, 'goToRandomQuiz');
    isLoading$.next(false);
    categories$.next([{ id: '1', numberOfQuestion: 10 }]);
    fixture.detectChanges();

    const luckyButton = fixture.debugElement.query(By.css('quiz-ui-button'));
    luckyButton.triggerEventHandler('buttonClick', null);

    expect(component.goToRandomQuiz).toHaveBeenCalled();
  });

  it('should display the correct quiz titles', () => {
    const mockCategories = [
      { id: '1', numberOfQuestion: 10, title: 'Quiz 1' },
      { id: '2', numberOfQuestion: 15, title: 'Quiz 2' },
    ];

    isLoading$.next(false);
    categories$.next(mockCategories);
    fixture.detectChanges();

    const quizCards = fixture.debugElement.queryAll(By.css('.quiz-title'));
    quizCards.forEach((card, index) => {
      // const titleElement = card.nativeElement.query(By.css('.quiz-title'));
      expect(card.nativeElement.textContent.trim()).toContain(
        mockCategories[index].title,
      );
    });
  });
});
