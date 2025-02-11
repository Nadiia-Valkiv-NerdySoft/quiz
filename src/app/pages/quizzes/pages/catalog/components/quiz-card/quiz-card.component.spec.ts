import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizCardComponent } from './quiz-card.component';
import { provideRouter } from '@angular/router';
import { QuizCardColors } from './quiz-card-colors.enums';

describe('UiQuizCardComponent', () => {
  let component: QuizCardComponent;
  let fixture: ComponentFixture<QuizCardComponent>;

  const quizCategory = {
    id: '1',
    numberOfQuestion: 5,
    cardColor: QuizCardColors.ACCENT,
    name: '',
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [QuizCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('quizCategory', quizCategory);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set categoryUrlRoute', () => {
    fixture.detectChanges();

    expect(component.categoryUrlRoute).toEqual([ '/quiz', '1', '5' ]);
  });

  it('should set styles', () => {
    expect(component.styles).toEqual({
      avatarSrc: 'assets/icons/profile-3.svg',
      backgroundColor: 'bg-accent',
      headerColor: 'text-bright',
      textColor: 'text-secondary',
    });
  });
});
