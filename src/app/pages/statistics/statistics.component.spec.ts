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

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let statisticsService: jest.Mocked<StatisticsService>;

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
    statisticsService = {
      updateStatistic: jest.fn(),
      getStatistic: jest.fn().mockReturnValue(mockStatisticsData),
    } as unknown as jest.Mocked<StatisticsService>;

    await TestBed.configureTestingModule({
      imports: [
        StatisticsComponent,
        UiButtonComponent,
        QuizFeedbackComponent,
        TimeFormatPipe,
        UiDonutChartComponent,
      ],
      providers: [
        { provide: StatisticsService, useValue: statisticsService },
        provideRouter([]),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize with default values', () => {
  //   expect(component.lastQuizData).toEqual(INITIAL_QUIZ_STATISTIC);
  //   expect(component.userStatistic()).toEqual(INITIAL_USER_STATISTIC);
  // });

  it('should load the statistics', () => {
    expect(component.userStatistic).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      fixture.detectChanges();
    });

    it('should call updateStatistic on init', () => {
      expect(statisticsService.updateStatistic).toHaveBeenCalledTimes(1);
    });

    it('should load statistics on init', () => {
      expect(statisticsService.getStatistic).toHaveBeenCalledTimes(1);
    });

    it('should update component data with loaded statistics', () => {
      expect(component.lastQuizData).toEqual(mockStatisticsData.lastQuizData);
      expect(component.userStatistic()).toEqual(
        mockStatisticsData.userStatistic,
      );
    });
  });
});
