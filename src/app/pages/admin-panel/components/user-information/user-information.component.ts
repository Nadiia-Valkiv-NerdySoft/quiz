import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../../services/user-service/user.service';
import { User } from '../../../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStatistic } from '../../../../shared/models/user-statistic.model';
import { UserStatisticsAdmin } from '../../../../shared/models/user-statistics-admin.model';
import { UiDonutChartComponent } from '../../../../shared/ui-kit/ui-donut-chart/ui-donut-chart.component';
import { TimeFormatPipe } from '../../../../shared/ui-kit/ui-quiz-feedback/time-format.pipe';
import { UiButtonComponent } from '../../../../shared/ui-kit/ui-button/ui-button.component';
import { FormatDatePipe } from '../../format-date.pipe';

@Component({
  selector: 'quiz-user-information',
  templateUrl: './user-information.component.html',
  imports: [
    UiDonutChartComponent,
    UiButtonComponent,
    TimeFormatPipe,
    FormatDatePipe,
  ],
})
export class UserInformationComponent implements OnInit {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  user = signal<User | null>(null);
  userStatistic = signal<UserStatistic | undefined>(undefined);
  userId!: number;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      return;
    }
    this.userId = +userId;
    this.loadUser(this.userId);
  }

  loadUser(userId: number): void {
    this.userService
    .getUser(userId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (user) => {
        this.user.set(user);
        if (user.statistics) {
          this.transformDataForChart(user);
        }
      },
    });
  }

  transformDataForChart(data: any): void {
    const userStat = JSON.parse(data.statistics) as UserStatisticsAdmin[];
    const numberOfQuizzes = userStat.length;
    const numberOfAllQuestions = userStat.reduce(
      (sum, item) => sum + item.total_questions,
      0,
    );
    const numberOfRightQuestions = userStat.reduce(
      (sum, item) => sum + item.answers.right,
      0,
    );
    const numberOfWrongQuestions = userStat.reduce(
      (sum, item) => sum + item.answers.wrong,
      0,
    );
    const averageTimePerOneQuiz = 124; // hardcoded because of lack of data from the backend

    this.userStatistic.set({
      numberOfQuizzes,
      numberOfAllQuestions,
      numberOfRightQuestions,
      numberOfWrongQuestions,
      averageTimePerOneQuiz,
    });
  }
}
