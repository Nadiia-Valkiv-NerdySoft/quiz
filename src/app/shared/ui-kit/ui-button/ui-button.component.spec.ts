import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiButtonComponent } from './ui-button.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('UiButtonComponent', () => {
  let component: UiButtonComponent;
  let fixture: ComponentFixture<UiButtonComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UiButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UiButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button with default properties', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));

    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.disabled).toBeFalsy();
    expect(buttonElement.nativeElement.routerLink).toBeFalsy();
  });

  it('should apply the correct classes based on inputs', () => {
    fixture.componentRef.setInput('customClasses', 'custom-class');

    expect(component.buttonClass).toContain('custom-class');
  });

  it('should emit buttonClick event when clicked', () => {
    jest.spyOn(component.buttonClick, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should disable the button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));

    expect(buttonElement.nativeElement.disabled).toBeTruthy();
    expect(buttonElement.nativeElement.classList).toContain(
      'cursor-not-allowed',
    );
  });

  it('should navigate to the correct route when clicked if route is provided', () => {
    fixture.componentRef.setInput('route', '/catalog');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));

    expect(
      buttonElement.nativeElement.getAttribute('ng-reflect-router-link'),
    ).toBe('/catalog');
  });
});
