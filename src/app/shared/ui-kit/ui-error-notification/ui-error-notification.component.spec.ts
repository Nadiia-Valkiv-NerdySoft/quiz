import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiErrorNotificationComponent } from './ui-error-notification.component';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('UiErrorNotificationComponent', () => {
  let component: UiErrorNotificationComponent;
  let fixture: ComponentFixture<UiErrorNotificationComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UiErrorNotificationComponent],
      providers: [
        provideAngularSvgIcon(),
        provideRouter([]),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiErrorNotificationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('errorMessage', 'An error occurred!');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const errorMessageElement = fixture.debugElement.query(
      By.css('div'),
    ).nativeElement;
    fixture.detectChanges();

    expect(errorMessageElement.textContent).toContain('An error occurred!');
  });

  it('should emit tryAgainButtonClick when the button is clicked', () => {
    jest.spyOn(component.tryAgainButtonClick, 'emit');
    const button = fixture.debugElement.query(By.css('quiz-ui-button'));
    button.triggerEventHandler('buttonClick', null);
    fixture.detectChanges();

    expect(component.tryAgainButtonClick.emit).toHaveBeenCalled();
  });
});
