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

  ngOnInit() {
    this.subscription = this.dialogService.openDialog$.subscribe(() => {
      this.open();
    });
  }

  open() {
    // eslint-disable-next-line no-console
    console.log('open');
    this.isDialogOpen = true;
  }

  onConfirm() {
    this.dialogService.confirm();
    this.closeDialog();
  }

  onCancel() {
    this.dialogService.cancel();
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogOpen = false;
  }
}
