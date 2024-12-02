import { QuizCardColors } from '../../enums/quiz-card-colors.enums';

export type QuizCardStyle = {
  // eslint-disable-next-line no-unused-vars
  [key in QuizCardColors]: {
    backgroundColor: string;
    textColor: string;
    headerColor: string;
    avatarSrc: string;
  };
};
