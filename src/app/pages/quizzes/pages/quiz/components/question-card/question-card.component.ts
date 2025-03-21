import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../../services/dialog-service/dialog.service';
import { ErrorHandlerService } from '../../../../../../services/error-handler-service/error-handler.service';
import { QuestionsService } from '../../../../../../services/questions-service/questions.service';
import { StatisticsService } from '../../../../../../services/statistics-service/statistics.service';
import { Question } from '../../../../../../shared/models/question.model';
import { UiButtonComponent } from '../../../../../../shared/ui-kit/ui-button/ui-button.component';
import { UiErrorNotificationComponent } from '../../../../../../shared/ui-kit/ui-error-notification/ui-error-notification.component';
import {
  defaultDialog,
  finishQuizDialog,
} from '../../../../../../shared/ui-kit/ui-navigation-confirm-dialog/dialog-states';
import { UiRadioGroupComponent } from '../../../../../../shared/ui-kit/ui-radio-group/ui-radio-group.component';
import { UiSpinnerComponent } from '../../../../../../shared/ui-kit/ui-spinner/ui-spinner.component';
import { AVATAR_PATHS } from '../../../catalog/components/quiz-card/quiz-card.constants';

@Component({
  selector: 'quiz-question-card',
  imports: [
    UiButtonComponent,
    SvgIconComponent,
    UiRadioGroupComponent,
    UiSpinnerComponent,
    AsyncPipe,
    UiErrorNotificationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './question-card.component.html',
})
export class QuestionCardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly questionsService = inject(QuestionsService);
  private readonly errorHandlerService = inject(ErrorHandlerService);
  private readonly dialogService = inject(DialogService);
  private readonly statisticsService = inject(StatisticsService);

  private subscription!: Subscription;

  private quizId!: number;
  numberOfQuestions!: number;
  isMessageVisible = false;
  avatarPath = AVATAR_PATHS.PROFILE_1;
  errorMessage$ = this.errorHandlerService.getErrorMessage$();
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);
  score = 0;
  startTime: number = 0;

  radioButtonControl = new FormControl('', Validators.required);

  currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()] || ({} as Question),
  );

  isFirstQuestion = computed(() => this.currentQuestionIndex() === 0);

  isLastQuestion = computed(
    () => this.currentQuestionIndex() === this.numberOfQuestions - 1,
  );

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.numberOfQuestions = +this.route.snapshot.paramMap.get('questions')!;

    this.loadQuestion();
    this.startTime = Date.now();

    this.resetStepMessage();

    this.dialogService.setCanPageLeaveStatus(true);
    this.dialogService.setDialogState(defaultDialog);

    window.addEventListener('beforeunload', this.handleBeforeUnload);
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

  nextQuestion(): void {
    if (this.radioButtonControl.valid) {
      this.saveCurrentAnswer();
      this.currentQuestionIndex.update(index => index + 1);
      this.restorePreviousAnswer();
    } else {
      this.isMessageVisible = true;
    }
  }

  previousQuestion(): void {
    if (!this.isFirstQuestion()) {
      this.currentQuestionIndex.update(index => index - 1);
      this.restorePreviousAnswer();
    }
  }

  finishQuiz(): void {
    if (this.radioButtonControl.valid) {
      this.saveCurrentAnswer();
      this.dialogService.setDialogState(finishQuizDialog);
      this.calculateScore();
      this.statisticsService.updateTemporaryLastQuizStatistic(
        this.score,
        this.questions().length,
        this.startTime,
      );

      this.router.navigate(['/statistics']);
    } else {
      this.isMessageVisible = true;
    }
  }

  private saveCurrentAnswer(): void {
    const updatedQuestions = [...this.questions()];
    const currentIndex = this.currentQuestionIndex();

    if (this.radioButtonControl.value) {
      updatedQuestions[currentIndex] = {
        ...updatedQuestions[currentIndex],
        userAnswer: this.radioButtonControl.value,
      };
      this.questions.set(updatedQuestions);
    }
  }

  private restorePreviousAnswer(): void {
    const previousAnswer
      = this.questions()[this.currentQuestionIndex()].userAnswer;

    if (previousAnswer) {
      this.radioButtonControl.setValue(previousAnswer);
    } else {
      this.radioButtonControl.reset();
    }
  }

  private resetStepMessage(): void {
    this.subscription = this.radioButtonControl.valueChanges.subscribe(() => {
      this.dialogService.setCanPageLeaveStatus(false);
      this.isMessageVisible = false;
    });
  }

  private handleBeforeUnload = (event: BeforeUnloadEvent): void => {
    if (!this.dialogService.canLeavePage()) {
      event.preventDefault();
    }
  };

  private calculateScore(): void {
    this.score = this.questions().reduce((acc, question) => {
      return acc + (question.correct_answer === question.userAnswer ? 1 : 0);
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }
}
