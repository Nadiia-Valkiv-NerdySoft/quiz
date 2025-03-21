import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { UiButtonComponent } from '../../../../shared/ui-kit/ui-button/ui-button.component';
import { NavigationConfirmDialogComponent } from '../../../../shared/ui-kit/ui-navigation-confirm-dialog/ui-navigation-confirm-dialog.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        QuizComponent,
        QuestionCardComponent,
        UiButtonComponent,
        NavigationConfirmDialogComponent,
      ],
      providers: [ provideRouter([]), provideHttpClient() ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Emoji Bands');
    expect(compiled.querySelector('h1')?.textContent).toContain('Quiz');
  });

  it('should render the question card component', () => {
    const questionCard = fixture.debugElement.query(
      By.css('quiz-question-card'),
    );
    expect(questionCard).toBeTruthy();
  });

  it('should render the button with correct text and route', () => {
    const button = fixture.debugElement.query(By.css('quiz-ui-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Back to all Quizzes');
    // eslint-disable-next-line dot-notation
    expect(button.attributes?.['route']).toBe('/catalog');
  });

  it('should render the navigation confirm dialog component', () => {
    const confirmDialog = fixture.debugElement.query(
      By.css('quiz-ui-navigation-confirm-dialog'),
    );
    expect(confirmDialog).toBeTruthy();
  });
});
