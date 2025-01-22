import { Component, input, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { UserStatistic } from '../../models/user-statistic.model';
import {
  StatisticItem,
  UiChartLegendItemComponent,
} from '../ui-chart-legend-item/ui-chart-legend-item.component';

@Component({
  selector: 'quiz-ui-donut-chart',
  standalone: true,
  imports: [ NgxChartsModule, UiChartLegendItemComponent ],
  templateUrl: './ui-donut-chart.component.html',
})
export class UiDonutChartComponent implements OnInit {
  userStatistic = input<UserStatistic>();
  donutData: StatisticItem[] = [];

  ngOnInit() {
    const statisticData = this.userStatistic();
    if (statisticData) {
      this.createDonutChartData(statisticData);
    }
  }

  createDonutChartData(statisticData: UserStatistic): void {
    this.donutData = [
      {
        name: 'Correct Answers',
        value: statisticData.numberOfRightQuestions,
        extra: 'Correct answers',
      },
      {
        name: 'Wrong Answers',
        value: statisticData.numberOfWrongQuestions,
        extra: 'Wrong answers',
      },
    ];
  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [ '#63C995', '#E23D69' ],
  };

  getColor(name: string): string {
    const item = this.colorScheme.domain.find(
      (color, index) => this.donutData[index]?.name === name,
    );
    return item || '#000';
  }
}
