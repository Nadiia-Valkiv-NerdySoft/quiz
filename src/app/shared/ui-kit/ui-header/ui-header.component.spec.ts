import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiHeaderComponent } from './ui-header.component';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';

describe('UiHeaderComponent', () => {
  let component: UiHeaderComponent;
  let fixture: ComponentFixture<UiHeaderComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UiHeaderComponent],
      providers: [
        provideRouter([]),
        provideAngularSvgIcon(),
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Menu State', () => {
    it('should initialize with closed menu', () => {
      expect(component.isMenuOpen()).toBeFalsy();
    });

    it('should toggle menu state when toggleMenu is called', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBeTruthy();

      component.toggleMenu();
      expect(component.isMenuOpen()).toBeFalsy();
    });

    it('should close menu when closeMenu is called', () => {
      component.isMenuOpen.set(true);
      component.closeMenu();
      expect(component.isMenuOpen()).toBeFalsy();
    });
  });

  describe('Responsive Design', () => {
    it('should have hidden mobile menu button on desktop', () => {
      const menuButton = fixture.nativeElement.querySelector('.md\\:hidden');
      expect(menuButton).toBeTruthy();
    });

    it('should have visible desktop navigation on larger screens', () => {
      const desktopNav
        = fixture.nativeElement.querySelector('.hidden.md\\:flex');
      expect(desktopNav).toBeTruthy();
    });
  });
});
