import { Component, input } from '@angular/core';

export interface StatisticItem {
  name: string;
  value: number;
  extra: string;
  numberOfRightQ?: number;
  numberOfWrongQ?: number;
  averageTimePerQ?: number;
}

@Component({
  selector: 'quiz-ui-chart-legend-item',
  standalone: true,
  imports: [],
  templateUrl: './ui-chart-legend-item.component.html',
})
export class UiChartLegendItemComponent {
  item = input.required<StatisticItem>();
  backgroundColor = input.required<string>();

  get value(): number {
    return this.item().value;
  }

  get hasQuestionStats(): boolean {
    return (
      this.item().numberOfRightQ !== undefined
      && this.item().numberOfWrongQ !== undefined
    );
  }
}
