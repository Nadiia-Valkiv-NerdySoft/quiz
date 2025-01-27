import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import {
  INITIAL_STATISTIC,
  Statistic,
} from '../../shared/models/statistic.model';
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  let statisticsService: StatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    statisticsService = TestBed.inject(StatisticsService);
    localStorage.clear();
  });

  describe('getStatistic', () => {
    it('should return INITIAL_STATISTIC when localStorage is empty', () => {
      // Arrange
      const result = statisticsService.getStatistic();

      // Assert
      expect(result).toEqual(INITIAL_STATISTIC);
    });
    it('should return parsed data from localStorage', () => {
      // Arrange
      const data: Statistic = {
        lastQuizData: {
          rightAnswers: 2,
          allAnswers: 4,
          time: 1000,
        },
        userStatistic: {
          numberOfQuizzes: 2,
          numberOfAllQuestions: 33,
          numberOfRightQuestions: 3,
          numberOfWrongQuestions: 30,
          averageTimePerOneQuiz: 1000,
        },
      };
      localStorage.setItem('statisticPageData', JSON.stringify(data));

      // Act
      const result = statisticsService.getStatistic();

      // Assert
      expect(result).toEqual(data);
    });
  });

  describe('saveStatistic', () => {
    it('should save data to localStorage', () => {
      // Arrange
      const data: Statistic = {
        lastQuizData: {
          rightAnswers: 2,
          allAnswers: 4,
          time: 1000,
        },
        userStatistic: {
          numberOfQuizzes: 2,
          numberOfAllQuestions: 33,
          numberOfRightQuestions: 3,
          numberOfWrongQuestions: 30,
          averageTimePerOneQuiz: 1000,
        },
      };

      // Act
      statisticsService.saveStatistic(data);

      // Assert
      expect(localStorage.getItem('statisticPageData')).toEqual(
        JSON.stringify(data),
      );
    });
  });

  describe('updateTemporaryLastQuizStatistic', () => {
    it('should update temporaryLastQuizStatistic', () => {
      // Act
      statisticsService.updateTemporaryLastQuizStatistic(2, 4, 1000);

      // Assert
      expect(statisticsService.temporaryLastQuizStatistic.rightAnswers).toEqual(
        2,
      );
      expect(statisticsService.temporaryLastQuizStatistic.allAnswers).toEqual(
        4,
      );
    });
  });

  describe('updateStatistic', () => {
    it('should update statistic', () => {
      // Arrange
      statisticsService.temporaryLastQuizStatistic = {
        rightAnswers: 2,
        allAnswers: 4,
        time: 1000,
      };
      const data: Statistic = {
        lastQuizData: {
          rightAnswers: 2,
          allAnswers: 4,
          time: 1000,
        },
        userStatistic: {
          numberOfQuizzes: 2,
          numberOfAllQuestions: 33,
          numberOfRightQuestions: 3,
          numberOfWrongQuestions: 30,
          averageTimePerOneQuiz: 1000,
        },
      };
      localStorage.setItem('statisticPageData', JSON.stringify(data));

      // Act
      statisticsService.updateStatistic();

      // Assert
      const result = localStorage.getItem('statisticPageData') ?? '{}';
      expect(JSON.parse(result)).toEqual({
        lastQuizData: {
          rightAnswers: 2,
          allAnswers: 4,
          time: expect.any(Number),
        },
        userStatistic: {
          numberOfQuizzes: 3,
          numberOfAllQuestions: 37,
          numberOfRightQuestions: 5,
          numberOfWrongQuestions: 32,
          averageTimePerOneQuiz: expect.any(Number),
        },
      });
    });
  });
});
