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
  templateUrl: './ui-radio-group.component.html',
})
export class UiRadioGroupComponent {
  optionControl = input.required<FormControl>();
  options = input<Option[]>([]);
}