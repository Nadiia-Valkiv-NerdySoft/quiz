import { DialogState } from '../ui-kit/ui-navigation-confirm-dialog/dialog-state.interface';

export const finishQuizDialog: DialogState = {
  isOpen: false,
  title: 'Finish Quiz',
  message: 'Are you sure you want to finish the quiz?',
  cancelText: 'Back to quiz',
  confirmText: 'Finish',
};

export const defaultDialog: DialogState = {
  isOpen: false,
  title: 'Cancel quiz',
  message:
    'Are you sure you want to exit and cancel the quiz? Your answers will not be saved.',
  cancelText: 'Back to quiz',
  confirmText: 'Leave page',
};
