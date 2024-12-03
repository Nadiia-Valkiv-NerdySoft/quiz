import { Component, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Option {
  id: string;
  label: string;
  checked?: boolean;
}

@Component({
  selector: 'quiz-ui-radio-group',
  standalone: true,
  imports: [],
  templateUrl: './ui-radio-group.component.html',
})
export class UiRadioGroupComponent {
  options = input<Option[]>([]);

  form = new FormGroup({
    name: new FormControl(null),
  });
}
