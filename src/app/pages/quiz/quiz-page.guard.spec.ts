import { TestBed } from '@angular/core/testing';
import { QuizPageGuard } from './quiz-page.guard';
import { Observable, Subject } from 'rxjs';
import { DialogState } from '../../shared/ui-kit/ui-navigation-confirm-dialog/dialog-state.interface';
import { DialogService } from '../../services/dialog-service/dialog.service';

describe('QuizPageGuard', () => {
  let guard: QuizPageGuard;
  let dialogService: DialogService;
  let statusSubject: Subject<boolean>;
  let openDialogSubject: Subject<DialogState>;

  beforeEach(() => {
    statusSubject = new Subject<boolean>();
    openDialogSubject = new Subject<DialogState>();

    const dialogServiceMock = {
      status$: statusSubject.asObservable(),
      openDialog$: openDialogSubject.asObservable(),
      setCanPageLeaveStatus: jest.fn(),
      setDialogState: jest.fn(),
      canLeavePage: jest.fn(),
      openConfirmDialog: jest.fn(),
      setStatus: jest.fn(),
      resetDialog: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        QuizPageGuard,
        { provide: DialogService, useValue: dialogServiceMock },
      ],
    });

    guard = TestBed.inject(QuizPageGuard);
    dialogService = TestBed.inject(DialogService);
  });

  afterEach(() => {
    statusSubject.complete();
    openDialogSubject.complete();
  });

  describe('Basic Guard Functionality', () => {
    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should allow navigation when canLeavePage returns true', () => {
      jest.spyOn(dialogService, 'canLeavePage').mockReturnValue(true);

      const result = guard.canDeactivate();

      expect(result).toBe(true);
      expect(dialogService.openConfirmDialog).not.toHaveBeenCalled();
    });

    it('should show confirmation dialog when canLeavePage returns false', () => {
      jest.spyOn(dialogService, 'canLeavePage').mockReturnValue(false);

      const result = guard.canDeactivate();

      expect(result).toBeInstanceOf(Observable);
      expect(dialogService.openConfirmDialog).toHaveBeenCalled();
    });
  });

  describe('Dialog Interaction', () => {
    beforeEach(() => {
      jest.spyOn(dialogService, 'canLeavePage').mockReturnValue(false);
    });

    it('should allow navigation when dialog is confirmed', (done) => {
      const result = guard.canDeactivate() as Observable<boolean>;

      result.subscribe((canLeave) => {
        expect(canLeave).toBe(true);
        done();
      });

      dialogService.setStatus(true);
      statusSubject.next(true);
    });

    it('should prevent navigation when dialog is cancelled', (done) => {
      const result = guard.canDeactivate() as Observable<boolean>;

      result.subscribe((canLeave) => {
        expect(canLeave).toBe(false);
        done();
      });

      dialogService.setStatus(false);
      statusSubject.next(false);
    });
  });
});
