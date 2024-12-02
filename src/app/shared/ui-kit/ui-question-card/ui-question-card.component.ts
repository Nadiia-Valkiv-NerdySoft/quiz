import { Component } from '@angular/core';
import { AVATAR_PATHS } from '../ui-quiz-card/ui-quiz-card.constants';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { SvgIconComponent } from 'angular-svg-icon';

const MOCK_OPTIONS = [
  { id: 'papper', label: 'Papper Ladies' },
  { id: 'spice', label: 'Spice Girls', checked: true },
  { id: 'jalapenia', label: 'Jalapenia Gaals' },
  { id: 'little', label: 'Little Mix' },
];

@Component({
  selector: 'quiz-ui-question-card',
  standalone: true,
  imports: [ UiButtonComponent, SvgIconComponent ],
  templateUrl: './ui-question-card.component.html',
})
export class UiQuestionCardComponent {
  avatarPath = AVATAR_PATHS.PROFILE_1;

  mockOptions = MOCK_OPTIONS;
}