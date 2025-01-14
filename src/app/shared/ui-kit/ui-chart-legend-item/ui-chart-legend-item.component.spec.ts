import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  UiChartLegendItemComponent,
  StatisticItem,
} from './ui-chart-legend-item.component';

describe('UiChartLegendItemComponent', () => {
  let component: UiChartLegendItemComponent;
  let fixture: ComponentFixture<UiChartLegendItemComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UiChartLegendItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiChartLegendItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct value from the input item', () => {
    const testItem: StatisticItem = {
      name: 'Test Item',
      value: 42,
      extra: 'Correct answers',
    };
    fixture.componentRef.setInput('item', testItem);

    expect(component.value).toBe(42);
  });

  it('should apply the success class for correct answers', () => {
    fixture.componentRef.setInput('item', {
      name: 'Test',
      value: 10,
      extra: 'Correct answers',
    });

    expect(component.getTextClass()).toBe('text-success');
  });

  it('should apply the error class for wrong answers', () => {
    fixture.componentRef.setInput('item', {
      name: 'Test',
      value: 5,
      extra: 'Wrong answers',
    });

    expect(component.getTextClass()).toBe('text-error');
  });
});
