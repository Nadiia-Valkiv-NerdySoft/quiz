import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiQuizCardComponent } from './ui-quiz-card.component';
import { provideRouter } from '@angular/router';
import { QuizCardColors } from '../../enums/quiz-card-colors.enums';

describe('UiQuizCardComponent', () => {
  let component: UiQuizCardComponent;
  let fixture: ComponentFixture<UiQuizCardComponent>;

  const quizCategory = {
    id: '1',
    numberOfQuestion: 5,
    cardColor: QuizCardColors.ACCENT,
    name: '',
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UiQuizCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UiQuizCardComponent);
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
