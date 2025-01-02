import { Component, input } from '@angular/core';

export interface StatisticItem {
  name: string;
  value: number;
  extra: string;
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

  getTextClass(): string {
    return this.item().extra === 'Correct answers'
      ? 'text-success'
      : 'text-error';
  }
}
