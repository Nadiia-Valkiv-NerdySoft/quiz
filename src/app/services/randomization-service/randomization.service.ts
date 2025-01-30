import { QuizCardColors } from '../../pages/catalog/components/quiz-card/quiz-card-colors.enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomizationService {
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomItems<T>(items: T[], count: number): T[] {
    return [...items].sort(() => Math.random() - 0.5).slice(0, count);
  }

  getRandomColor(): QuizCardColors {
    const colors = Object.values(QuizCardColors);
    const randomIndex = this.getRandomInt(0, colors.length - 1);
    return colors[randomIndex] as QuizCardColors;
  }
}
