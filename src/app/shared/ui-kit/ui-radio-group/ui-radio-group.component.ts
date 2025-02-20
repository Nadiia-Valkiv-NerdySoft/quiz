import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'quiz-ui-radio-group',
  imports: [ReactiveFormsModule],
  templateUrl: './ui-radio-group.component.html',
})
export class UiRadioGroupComponent {
  optionControl = input.required<FormControl>();
  options = input<string[]>();
}
