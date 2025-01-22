import { Injectable } from '@angular/core';
import {
  INITIAL_STATISTIC,
  Statistic,
} from '../../shared/models/statistic.model';
import { UserStatistic } from '../../shared/models/user-statistic.model';
import {
  INITIAL_QUIZ_STATISTIC,
  QuizStatistic,
} from '../../shared/models/quiz-statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly STORAGE_KEY = 'statisticPageData';
  temporaryLastQuizStatistic: QuizStatistic = INITIAL_QUIZ_STATISTIC;

  getStatistic(): Statistic {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_STATISTIC;
  }

  saveStatistic(data: Statistic): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  updateTemporaryLastQuizStatistic(
    score: number,
    numberOfQuestions: number,
    startTime: number,
  ): void {
    const timeTaken = this.calculateTakenTimeOnQuiz(startTime);

    this.temporaryLastQuizStatistic = {
      rightAnswers: score,
      allAnswers: numberOfQuestions,
      time: timeTaken,
    };
  }

  updateStatistic(): void {
    const statistic = this.getStatistic();
    this.updateLastQuizStatistic(statistic.lastQuizData);

    this.updateUserStatistic(statistic.userStatistic);

    this.saveStatistic(statistic);
  }

  private updateLastQuizStatistic(lastQuizData: QuizStatistic): void {
    lastQuizData.rightAnswers = this.temporaryLastQuizStatistic.rightAnswers;
    lastQuizData.allAnswers = this.temporaryLastQuizStatistic.allAnswers;
    lastQuizData.time = this.temporaryLastQuizStatistic.time;
  }

  private updateUserStatistic(userStatistic: UserStatistic): void {
    userStatistic.numberOfQuizzes += 1;
    userStatistic.numberOfAllQuestions
      += this.temporaryLastQuizStatistic.allAnswers;
    userStatistic.numberOfRightQuestions
      += this.temporaryLastQuizStatistic.rightAnswers;
    userStatistic.numberOfWrongQuestions
      += this.temporaryLastQuizStatistic.allAnswers
      - this.temporaryLastQuizStatistic.rightAnswers;

    const totalTime = this.calculateTotalTimeOnQuizzes(
      userStatistic,
      this.temporaryLastQuizStatistic.time,
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
      userStatistic.averageTimePerOneQuiz
        * (userStatistic.numberOfQuizzes - 1)
      + timeTaken
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
