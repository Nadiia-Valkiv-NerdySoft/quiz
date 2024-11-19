import { QuizCardColors } from '../../enums/quiz-card-colors.enums';
import { AVATAR_PATHS } from './ui-quiz-card.constants';
import { QuizCardStyle } from './ui-quiz-card.types';

export const QUIZ_CARD_STYLES: QuizCardStyle = {
  [QuizCardColors.SUCCESS]: {
    backgroundColor: 'bg-success',
    textColor: 'text-primary',
    headerColor: 'text-bright',
    avatarSrc: AVATAR_PATHS.PROFILE_1,
  },
  [QuizCardColors.ERROR]: {
    backgroundColor: 'bg-error',
    textColor: 'text-primary',
    headerColor: 'text-bright',
    avatarSrc: AVATAR_PATHS.PROFILE_2,
  },
  [QuizCardColors.ACCENT]: {
    backgroundColor: 'bg-accent',
    textColor: 'text-secondary',
    headerColor: 'text-bright',
    avatarSrc: AVATAR_PATHS.PROFILE_3,
  },
  [QuizCardColors.WARNING]: {
    backgroundColor: 'bg-warning',
    textColor: 'text-secondary',
    headerColor: 'text-primary',
    avatarSrc: AVATAR_PATHS.PROFILE_4,
  },
  [QuizCardColors.BRIGHT]: {
    backgroundColor: 'bg-bright',
    textColor: 'text-secondary',
    headerColor: 'text-primary',
    avatarSrc: AVATAR_PATHS.PROFILE_1,
  },
};
