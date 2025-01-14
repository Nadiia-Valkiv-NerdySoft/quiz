import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRadioGroupComponent } from './ui-radio-group.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UiRadioGroupComponent', () => {
  let component: UiRadioGroupComponent;
  let componentRef: ComponentRef<UiRadioGroupComponent>;
  let fixture: ComponentFixture<UiRadioGroupComponent>;
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ UiRadioGroupComponent, ReactiveFormsModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRadioGroupComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('optionControl', new FormControl(''));
    componentRef.setInput('options', [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all provided options', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(4);

    labels.forEach((label, index) => {
      const span = label.query(By.css('span'));
      expect(span.nativeElement.innerHTML).toBe(`Option ${index + 1}`);
    });
  });

  it('should update the control value when a radio button is clicked', () => {
    const radioButtons = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    radioButtons[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.optionControl().value).toBe('Option 2');
  });

  it('should visually update when the control value changes programmatically', () => {
    component.optionControl().setValue('Option 3');
    fixture.detectChanges();

    const radioButtons = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    expect(radioButtons[2].nativeElement.checked).toBeTruthy();
  });
});
