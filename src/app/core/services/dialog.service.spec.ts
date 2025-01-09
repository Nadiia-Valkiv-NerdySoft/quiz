import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let dialogService: DialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService],
    });
    dialogService = TestBed.inject(DialogService);
  });

  describe('setCanPageLeaveStatus', () => {
    it('should set the canLeavePageStatus', () => {
      // Act
      dialogService.setCanPageLeaveStatus(true);
      // Assert
      expect(dialogService.canLeavePage()).toBe(true);
    });
  });

  describe('setDialogState', () => {
    it('should set the dialogState', () => {
      // Arrange
      const expectedState = {
        isOpen: false,
        title: 'Test Title',
        message: 'Test Message',
        cancelText: 'Cancel Test',
        confirmText: 'Confirm Test',
      };
      // Act
      dialogService.setDialogState(expectedState);
      // Assert
      // eslint-disable-next-line dot-notation
      expect(dialogService['dialogState']).toBe(expectedState);
    });
  });

  describe('openConfirmDialog', () => {
    it('should set the dialogState isOpen to true', () => {
      // Arrange
      dialogService.setDialogState({
        isOpen: true,
        title: 'Test Title',
        message: 'Test Message',
        cancelText: 'Cancel Test',
        confirmText: 'Confirm Test',
      });
      // Act
      dialogService.openConfirmDialog();
      // Assert
      // eslint-disable-next-line dot-notation
      expect(dialogService['dialogState'].isOpen).toBe(true);
    });
  });

  describe('setStatus', () => {
    it('should set the statusSubject', (done) => {
      // Arrange
      const expectedStatus = true;
      // Act
      dialogService.status$.subscribe((status) => {
        // Assert
        expect(status).toBe(expectedStatus);
        done();
      });
      dialogService.setStatus(expectedStatus);
    });
  });

  describe('resetDialog', () => {
    it('should reset the canLeavePageStatus and statusSubject', () => {
      // Arrange
      dialogService.setCanPageLeaveStatus(true);
      dialogService.setStatus(true);
      // Act
      dialogService.resetDialog();
      // Assert
      expect(dialogService.canLeavePage()).toBe(false);
      dialogService.status$.subscribe((status) => {
        expect(status).toBe(false);
      });
    });
  });
});
