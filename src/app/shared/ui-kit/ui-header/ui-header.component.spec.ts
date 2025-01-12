import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiHeaderComponent } from './ui-header.component';
import { provideRouter } from '@angular/router';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

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
      const mobileMenu = fixture.debugElement.query(By.css('.fixed'));
      const svgIcon = fixture.debugElement.query(By.css('svg-icon'));

      expect(component.isMenuOpen()).toBeFalsy();
      expect(mobileMenu.nativeElement.classList).toContain('-translate-y-full');
      expect(svgIcon.componentInstance.src()).toBe('assets/icons/menu.svg');

      component.toggleMenu();
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBeTruthy();
      expect(mobileMenu.nativeElement.classList).toContain('translate-y-0');
      expect(svgIcon.componentInstance.src()).toBe('assets/icons/close.svg');
    });

    it('should close menu when closeMenu is called', () => {
      component.isMenuOpen.set(true);
      component.closeMenu();
      expect(component.isMenuOpen()).toBeFalsy();
    });
  });
});
