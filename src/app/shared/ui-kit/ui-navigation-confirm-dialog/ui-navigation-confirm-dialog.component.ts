import { Component, inject } from '@angular/core';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { DialogService } from '../../../core/services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'quiz-ui-navigation-confirm-dialog',
  standalone: true,
  imports: [UiButtonComponent],
  templateUrl: './ui-navigation-confirm-dialog.component.html',
})
export class NavigationConfirmDialogComponent {
  dialogService = inject(DialogService);
  isDialogOpen = false;
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.dialogService.openDialog$.subscribe(() => {
      this.open();
    });
  }

  open(): void {
    this.isDialogOpen = true;
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
    this.isDialogOpen = false;
  }
}
