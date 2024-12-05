import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AVATAR_PATHS } from '../ui-quiz-card/ui-quiz-card.constants';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { FormControl } from '@angular/forms';
import { UiRadioGroupComponent } from '../ui-radio-group/ui-radio-group.component';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../../../core/services/questions.service';
import { Question } from '../../models/question.model';
import { UiSpinnerComponent } from '../ui-spinner/ui-spinner.component';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { AsyncPipe } from '@angular/common';
import { UiErrorNotificationComponent } from '../ui-error-notification/ui-error-notification.component';

@Component({
  selector: 'quiz-ui-question-card',
  standalone: true,
  imports: [
    UiButtonComponent,
    SvgIconComponent,
    UiRadioGroupComponent,
    UiSpinnerComponent,
    AsyncPipe,
    UiErrorNotificationComponent,
  ],
  templateUrl: './ui-question-card.component.html',
})
export class UiQuestionCardComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly questionsService = inject(QuestionsService);
  private readonly errorHandlerService = inject(ErrorHandlerService);

  private quizId!: number;
  numberOfQuestions!: number;
  avatarPath = AVATAR_PATHS.PROFILE_1;
  errorMessage$ = this.errorHandlerService.getErrorMessage$();
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);

  radioButtonControl = new FormControl('');

  currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()] || ({} as Question),
  );

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.numberOfQuestions = +this.route.snapshot.paramMap.get('questions')!;

    this.loadQuestion();
  }

  loadQuestion(): void {
    this.questionsService
    .getQuestions(this.numberOfQuestions, this.quizId)
    .subscribe({
      next: (q) => {
        this.questions.set(q);
      },
    });
  }
}
