import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Option } from '../../models/option.model';

@Component({
  selector: 'quiz-ui-radio-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ui-radio-group.component.html',
})
export class UiRadioGroupComponent {
  optionControl = input.required<FormControl>();
  options = input<Option[]>();
}
