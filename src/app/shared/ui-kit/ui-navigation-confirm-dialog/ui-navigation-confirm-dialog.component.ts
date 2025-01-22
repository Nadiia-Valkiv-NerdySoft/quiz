import { Component, inject } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { DialogService } from '../../../core/services/dialog.service';
import { Subscription } from 'rxjs';
import { DialogState } from './dialog-state.interface';

@Component({
  selector: 'quiz-ui-navigation-confirm-dialog',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './ui-navigation-confirm-dialog.component.html',
})
export class NavigationConfirmDialogComponent {
  dialogService = inject(DialogService);
  dialogState: DialogState = {
    isOpen: false,
    title: '',
    message: '',
    cancelText: '',
    confirmText: '',
  };

  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.dialogService.openDialog$.subscribe((state) => {
      this.dialogState = state;
    });
  }

  onConfirm(): void {
    this.dialogService.setStatus(true);
    this.closeDialog();
  }

  onCancel(): void {
    this.dialogService.setStatus(false);
    this.closeDialog();
  }

  private closeDialog(): void {
    this.dialogState = {
      ...this.dialogState,
      isOpen: false,
    };
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
