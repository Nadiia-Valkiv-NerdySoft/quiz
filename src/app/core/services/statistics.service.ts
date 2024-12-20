import { Injectable } from '@angular/core';
import {
  INITIAL_STATISTIC,
  Statistic,
} from '../../shared/models/statistic.model';
import { UserStatistic } from '../../shared/models/user-statistic.model';
import { QuizStatistic } from '../../shared/models/quiz-statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly STORAGE_KEY = 'statisticPageData';

  getStatistic(): Statistic {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_STATISTIC;
  }

  saveStatistic(data: Statistic): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  updateStatistic(
    score: number,
    numberOfQuestions: number,
    startTime: number,
  ): void {
    const statistic = this.getStatistic();
    const timeTaken = this.calculateTakenTimeOnQuiz(startTime);

    this.updateLastQuizStatistic(
      statistic.lastQuizData,
      score,
      numberOfQuestions,
      timeTaken,
    );

    this.updateUserStatistic(
      statistic.userStatistic,
      score,
      numberOfQuestions,
      timeTaken,
    );

    this.saveStatistic(statistic);
  }

  private updateLastQuizStatistic(
    lastQuizData: QuizStatistic,
    score: number,
    numberOfQuestions: number,
    timeTaken: number,
  ): void {
    lastQuizData.rightAnswers = score;
    lastQuizData.allAnswers = numberOfQuestions;
    lastQuizData.time = timeTaken;
  }

  private updateUserStatistic(
    userStatistic: UserStatistic,
    score: number,
    numberOfQuestions: number,
    timeTaken: number,
  ): void {
    userStatistic.numberOfQuizzes += 1;
    userStatistic.numberOfAllQuestions += numberOfQuestions;
    userStatistic.numberOfRightQuestions += score;
    userStatistic.numberOfWrongQuestions += numberOfQuestions - score;

    const totalTime = this.calculateTotalTimeOnQuizzes(
      userStatistic,
      timeTaken,
    );
    userStatistic.averageTimePerOneQuiz = this.calculateAverageTimeOnQuiz(
      totalTime,
      userStatistic.numberOfQuizzes,
    );
  }

  private calculateTotalTimeOnQuizzes(
    userStatistic: UserStatistic,
    timeTaken: number,
  ): number {
    return (
      userStatistic.averageTimePerOneQuiz * userStatistic.numberOfQuizzes
      + timeTaken / 60
    );
  }

  private calculateAverageTimeOnQuiz(
    totalTime: number,
    numberOfQuizzes: number,
  ): number {
    return parseFloat((totalTime / numberOfQuizzes).toFixed(1));
  }

  private calculateTakenTimeOnQuiz(startTime: number): number {
    const currentTime = Date.now();
    const elapsedTimeInSeconds = (currentTime - startTime) / 1000;

    return parseFloat(elapsedTimeInSeconds.toFixed(1));
  }
}
