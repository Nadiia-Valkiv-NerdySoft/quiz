import { Component } from '@angular/core';
import { AVATAR_PATHS } from '../ui-quiz-card/ui-quiz-card.constants';
import { NgFor } from '@angular/common';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { SvgIconComponent } from 'angular-svg-icon';

const MOCK_OPTIONS = [
  { id: 'papper-ladies', label: 'Papper Ladies' },
  { id: 'spice-girls', label: 'Spice Girls', checked: true },
  { id: 'jalapenia-gaals', label: 'Jalapenia Gaals' },
  { id: 'little-mix', label: 'Little Mix' },
];

@Component({
  selector: 'quiz-ui-question-card',
  standalone: true,
  imports: [ NgFor, UiButtonComponent, SvgIconComponent ],
  templateUrl: './ui-question-card.component.html',
})
export class UiQuestionCardComponent {
  avatarPath = AVATAR_PATHS.PROFILE_1;

  mockOptions = MOCK_OPTIONS;
  radioGroupName = 'girls';
}
