import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-quiz',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
})
export class QuizComponent {
  quizId!: string;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('id')!;
  }
}
