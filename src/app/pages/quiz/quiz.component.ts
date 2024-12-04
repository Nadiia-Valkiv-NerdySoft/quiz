import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UiQuestionCardComponent } from '../../shared/ui-kit/ui-question-card/ui-question-card.component';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';

@Component({
  selector: 'quiz-quiz',
  standalone: true,
  imports: [ RouterLink, UiQuestionCardComponent, UiButtonComponent ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent {
  quizId!: string;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')!;
  }
}
