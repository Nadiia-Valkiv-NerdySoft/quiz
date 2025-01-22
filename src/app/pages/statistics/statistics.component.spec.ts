import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from '../../core/services/statistics.service';
import { QuizFeedbackComponent } from '../../shared/ui-kit/ui-quiz-feedback/ui-quiz-feedback.component';
import { INITIAL_QUIZ_STATISTIC } from '../../shared/models/quiz-statistic.model';
import { INITIAL_USER_STATISTIC } from '../../shared/models/user-statistic.model';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiDonutChartComponent } from '../../shared/ui-kit/ui-donut-chart/ui-donut-chart.component';
import { TimeFormatPipe } from '../../shared/ui-kit/ui-quiz-feedback/time-format.pipe';
import { By } from '@angular/platform-browser';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let statisticsService: StatisticsService;

  const mockStatisticsData = {
    lastQuizData: {
      ...INITIAL_QUIZ_STATISTIC,
      totalQuestions: 10,
      correctAnswers: 8,
      quizTime: 300,
    },
    userStatistic: {
      ...INITIAL_USER_STATISTIC,
      numberOfQuizzes: 5,
      numberOfAllQuestions: 50,
      averageTimePerOneQuiz: 250,
      correctAnswersPercentage: 80,
    },
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        StatisticsComponent,
        UiButtonComponent,
        QuizFeedbackComponent,
        TimeFormatPipe,
        UiDonutChartComponent,
      ],
      providers: [ StatisticsService, provideRouter([]), provideHttpClient() ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;

    statisticsService = TestBed.inject(StatisticsService);
    jest
    .spyOn(statisticsService, 'getStatistic')
    .mockReturnValue(mockStatisticsData);
    jest.spyOn(statisticsService, 'updateStatistic');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.lastQuizData).toEqual(INITIAL_QUIZ_STATISTIC);
    expect(component.userStatistic()).toEqual(INITIAL_USER_STATISTIC);
  });

  it('should load the statistics', () => {
    expect(component.userStatistic).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      fixture.detectChanges();
    });

    it('should not call updateStatistic on init when no played quizzes', () => {
      expect(statisticsService.updateStatistic).toHaveBeenCalledTimes(0);
    });

    it('should load statistics on init', () => {
      expect(statisticsService.getStatistic).toHaveBeenCalledTimes(1);
      expect(statisticsService.getStatistic()).toEqual(mockStatisticsData);
    });

    it('should update component data with loaded statistics', () => {
      expect(component.lastQuizData).toEqual(mockStatisticsData.lastQuizData);
      expect(component.userStatistic()).toEqual(
        mockStatisticsData.userStatistic,
      );
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render quiz feedback with correct data', () => {
      const feedbackElement = fixture.debugElement.query(
        By.directive(QuizFeedbackComponent),
      );
      expect(feedbackElement).toBeTruthy();
      expect(feedbackElement.componentInstance.lastQuizData()).toEqual(
        mockStatisticsData.lastQuizData,
      );
    });

    it('should display correct statistics values', () => {
      const statsValues = fixture.debugElement.queryAll(
        By.css('.grid p:not(.font-semibold)'),
      );
      expect(statsValues[0].nativeElement.textContent.trim()).toBe(
        mockStatisticsData.userStatistic.numberOfQuizzes.toString(),
      );
      expect(statsValues[1].nativeElement.textContent.trim()).toBe(
        mockStatisticsData.userStatistic.numberOfAllQuestions.toString(),
      );
    });

    it('should format average time correctly', () => {
      const timeElement = fixture.debugElement.query(
        By.css('.grid p:last-child'),
      );
      const formattedTime = new TimeFormatPipe().transform(
        mockStatisticsData.userStatistic.averageTimePerOneQuiz,
      );
      expect(timeElement.nativeElement.textContent.trim()).toBe(formattedTime);
    });
  });
});
