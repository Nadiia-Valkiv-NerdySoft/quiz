import { Component, inject, OnInit, signal } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import {} from '../../shared/ui-kit/ui-chart-legend-item/ui-chart-legend-item.component';
import { StatisticsService } from '../../core/services/statistics.service';
import { INITIAL_QUIZ_STATISTIC } from '../../shared/models/quiz-statistic.model';
import {
  INITIAL_USER_STATISTIC,
  UserStatistic,
} from '../../shared/models/user-statistic.model';
import { LastQuizData } from '../../shared/models/last-quiz-data.model';
import { QuizFeedbackComponent } from '../../shared/ui-kit/ui-quiz-feedback/ui-quiz-feedback.component';
import { TimeFormatPipe } from '../../shared/ui-kit/ui-quiz-feedback/time-format.pipe';
import { UiDonutChartComponent } from '../../shared/ui-kit/ui-donut-chart/ui-donut-chart.component';

@Component({
  selector: 'quiz-statistics',
  standalone: true,
  imports: [
    UiButtonComponent,
    QuizFeedbackComponent,
    TimeFormatPipe,
    UiDonutChartComponent,
  ],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  private statisticsService = inject(StatisticsService);
  lastQuizData: LastQuizData = INITIAL_QUIZ_STATISTIC;
  userStatistic = signal<UserStatistic>(INITIAL_USER_STATISTIC);

  ngOnInit(): void {
    if (this.statisticsService.temporaryLastQuizStatistic.allAnswers !== 0) {
      this.statisticsService.updateStatistic();
    }
    this.loadStatistics();
  }

  private loadStatistics(): void {
    const statsData = this.statisticsService.getStatistic();
    if (statsData) {
      const { lastQuizData, userStatistic } = statsData;
      this.lastQuizData = lastQuizData;
      this.userStatistic.set(userStatistic);
    }
  }
}
