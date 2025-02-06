import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiHeaderComponent } from '../../shared/ui-kit/ui-header/ui-header.component';

@Component({
  selector: 'quiz-quizzes',
  standalone: true,
  imports: [ RouterOutlet, UiHeaderComponent ],
  templateUrl: './quizzes.component.html',
})
export class QuizzesComponent {

}
