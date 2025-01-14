import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '../../../core/services/dialog.service';
import { NavigationConfirmDialogComponent } from './ui-navigation-confirm-dialog.component';
import { of } from 'rxjs/internal/observable/of';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('UiNavigationConfirmDialogComponent', () => {
  let component: NavigationConfirmDialogComponent;
  let fixture: ComponentFixture<NavigationConfirmDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [NavigationConfirmDialogComponent],
      providers: [
        {
          provide: DialogService,
          useValue: {
            openDialog$: of({
              isOpen: true,
              title: 'Test Title',
              message: 'Test Message',
              cancelText: 'Cancel',
              confirmText: 'Confirm',
            }),
            setStatus: jest.fn(),
          },
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationConfirmDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set status true on confirm', () => {
    component.onConfirm();

    expect(component.dialogService.setStatus).toHaveBeenCalledWith(true);
  });

  it('should set status false on cancel', () => {
    component.onCancel();

    expect(component.dialogService.setStatus).toHaveBeenCalledWith(false);
  });

  it('should show message and title', () => {
    const compiled = fixture.debugElement;
    fixture.detectChanges();

    expect(
      compiled.query(By.css('.text-4xl')).nativeElement.textContent,
    ).toContain('Test Title');
    expect(
      compiled.query(By.css('.text-2xl')).nativeElement.textContent,
    ).toContain('Test Message');
  });
});
