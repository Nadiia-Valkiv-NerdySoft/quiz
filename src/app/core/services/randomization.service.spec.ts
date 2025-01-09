import { TestBed } from '@angular/core/testing';
import { RandomizationService } from './randomization.service';
import { QuizCardColors } from '../../shared/enums/quiz-card-colors.enums';

describe('RandomizationService', () => {
  let service: RandomizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomizationService],
    });
    service = TestBed.inject(RandomizationService);
  });

  describe('getRandomInt', () => {
    it('should return a random integer between the min and max values', () => {
      // Arrange
      const min = 1;
      const max = 10;
      // Act
      const result = service.getRandomInt(min, max);
      // Assert
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('getRandomItems', () => {
    it('should return a random number of items from the array', () => {
      // Arrange
      const items = [ 1, 2, 3, 4, 5 ];
      const count = 2;
      // Act
      const result = service.getRandomItems(items, count);
      // Assert
      expect(result.length).toBe(count);
      result.forEach(item => expect(items).toContain(item));
    });

    describe('getRandomColor', () => {
      it('should return a random color from the QuizCardColors enum', () => {
        //Arrange
        const validColors = [
          QuizCardColors.ACCENT,
          QuizCardColors.WARNING,
          QuizCardColors.SUCCESS,
          QuizCardColors.ERROR,
          QuizCardColors.BRIGHT,
        ];
        // Act
        const result = service.getRandomColor();
        // Assert
        expect(validColors).toContain(result);
      });
    });
  });
});
