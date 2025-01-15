import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizFeedbackComponent } from './ui-quiz-feedback.component';

describe('UiQuizFeedbackComponent', () => {
  let component: QuizFeedbackComponent;
  let fixture: ComponentFixture<QuizFeedbackComponent>;

  const lastQuizData = {
    rightAnswers: 5,
    allAnswers: 10,
  };

  const notRealisticLastQuizData = {
    rightAnswers: 15,
    allAnswers: 10,
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [QuizFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizFeedbackComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get feedback message', () => {
    fixture.componentRef.setInput('lastQuizData', lastQuizData);

    expect(component.getFeedbackMessage()).toEqual(
      'Good try! Why not have another go? You might get a bigger score!',
    );
  });

  it('should get default feedback message', () => {
    fixture.componentRef.setInput('lastQuizData', notRealisticLastQuizData);

    expect(component.getFeedbackMessage()).toEqual(
      'Something went wrong. Please try again later.',
    );
  });
});
