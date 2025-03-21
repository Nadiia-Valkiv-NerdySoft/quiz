import { QuizCardColors } from '../pages/quizzes/pages/catalog/components/quiz-card/quiz-card-colors.enums';

export class RandomUtils {
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomColor(): QuizCardColors {
    const colors = Object.values(QuizCardColors);
    const randomIndex = this.getRandomInt(0, colors.length - 1);
    return colors[randomIndex] as QuizCardColors;
  }

  static getRandomItems<T>(items: T[], count: number): T[] {
    return [...items].sort(() => Math.random() - 0.5).slice(0, count);
  }
}
