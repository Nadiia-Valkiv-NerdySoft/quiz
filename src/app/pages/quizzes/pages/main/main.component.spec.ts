import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { UiButtonComponent } from '../../../../shared/ui-kit/ui-button/ui-button.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ MainComponent, UiButtonComponent ],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the text "Make your choice." correctly', () => {
    const compiled = fixture.nativeElement;
    const text = compiled.querySelector('span.p-4')?.textContent;
    expect(text).toContain('Make your');
  });

  it('should have a "Let\'s play" button', () => {
    const button = fixture.debugElement.query(By.css('quiz-ui-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Let\'s play');
  });

  it('should navigate to /catalog when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('quiz-ui-button'));
    const routerLink = button.nativeElement.getAttribute('route');
    expect(routerLink).toBe('/catalog');
  });
});
