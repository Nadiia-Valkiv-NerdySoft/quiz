import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import {
  StatisticItem,
  UiChartLegendItemComponent,
} from '../../shared/ui-kit/ui-chart-legend-item/ui-chart-legend-item.component';

@Component({
  selector: 'quiz-statistics',
  standalone: true,
  imports: [ UiButtonComponent, NgxChartsModule, UiChartLegendItemComponent ],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  numberOfQuizzes = 33;
  numberOfAllQuestions = 67;
  numberOfRightQuestions = 60;
  numberOfWrongQuestions = 7;
  averageTimePerOneQuiz = 24;

  data: StatisticItem[] = [
    {
      name: 'Quizzes played',
      value: this.numberOfQuizzes,
      extra: 'Quizzes were played',
    },
    {
      name: 'Questions answered',
      value: this.numberOfAllQuestions,
      extra: 'Questions have been answered',
      numberOfRightQ: this.numberOfRightQuestions,
      numberOfWrongQ: this.numberOfWrongQuestions,
    },
    {
      name: 'Average time',
      value: this.averageTimePerOneQuiz,
      extra: 'Average time of answering quizzes',
    },
  ];

  getColor(name: string): string {
    const item = this.colorScheme.domain.find(
      (color, index) => this.data[index]?.name === name,
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
