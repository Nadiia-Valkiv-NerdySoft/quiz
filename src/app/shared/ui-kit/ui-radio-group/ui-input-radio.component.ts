import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Option {
  id: string;
  label: string;
  checked?: boolean;
}

@Component({
  selector: 'quiz-ui-radio-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ui-input-radio.component.html',
})
export class UiInputRadioComponent {
  optionControl = input.required<FormControl>();
  option = input.required<Option>();
}
