import { Component, inject, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import {
  StatisticItem,
  UiChartLegendItemComponent,
} from '../../shared/ui-kit/ui-chart-legend-item/ui-chart-legend-item.component';
import { StatisticsService } from '../../core/services/statistics.service';
import { TimeFormatPipe } from './time-format.pipe';
import { INITIAL_QUIZ_STATISTIC } from '../../shared/models/quiz-statistic.model';
import { UserStatistic } from '../../shared/models/user-statistic.model';

interface LastQuizData {
  rightAnswers: number;
  allAnswers: number;
  time: number;
}

@Component({
  selector: 'quiz-statistics',
  standalone: true,
  imports: [
    UiButtonComponent,
    NgxChartsModule,
    UiChartLegendItemComponent,
    TimeFormatPipe,
  ],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {
  private statisticsService = inject(StatisticsService);
  donutChartData: StatisticItem[] = [];
  lastQuizData: LastQuizData = INITIAL_QUIZ_STATISTIC;

  ngOnInit(): void {
    this.statisticsService.updateStatistic();
    this.loadStatistics();
  }

  private loadStatistics(): void {
    const statsData = this.statisticsService.getStatistic();

    if (statsData) {
      const { lastQuizData, userStatistic: statisticData } = statsData;
      this.lastQuizData = lastQuizData;

      this.createDonutChartData(statisticData);
    }
  }

  createDonutChartData(statisticData: UserStatistic): void {
    this.donutChartData = [
      {
        name: 'Quizzes played',
        value: statisticData.numberOfQuizzes,
        extra: 'Quizzes were played',
      },
      {
        name: 'Questions answered',
        value: statisticData.numberOfAllQuestions,
        extra: 'Questions have been answered',
        numberOfRightQ: statisticData.numberOfRightQuestions,
        numberOfWrongQ: statisticData.numberOfWrongQuestions,
      },
      {
        name: 'Average time',
        value: statisticData.averageTimePerOneQuiz,
        extra: 'Average time of answering quizzes',
      },
    ];
  }

  getColor(name: string): string {
    const item = this.colorScheme.domain.find(
      (color, index) => this.donutChartData[index]?.name === name,
    );
    return item || '#000';
  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [ '#FEFD54', '#63C995', '#3545E9' ],
  };

  trackByItem(index: number, item: any): number {
    return item.id;
  }
}
