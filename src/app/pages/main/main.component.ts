import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiHeaderComponent } from '../../shared/ui-kit/ui-header/ui-header.component';

@Component({
  selector: 'quiz-main',
  standalone: true,
  imports: [ UiButtonComponent, CommonModule, UiHeaderComponent ],
  templateUrl: './main.component.html',
})
export class MainComponent {
  handleButtonClick() {
    alert('test button clicked');
  }
}
