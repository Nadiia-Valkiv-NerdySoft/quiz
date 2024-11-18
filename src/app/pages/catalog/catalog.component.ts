import { Component } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-kit/ui-button/ui-button.component';
import { UiQuizCardComponent } from '../../shared/ui-kit/ui-quiz-card/ui-quiz-card.component';

@Component({
  selector: 'quiz-catalog',
  standalone: true,
  imports: [ UiButtonComponent, UiQuizCardComponent ],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  mockCategories = [
    {
      category: 'Emoji Bands Quiz!',
      cardColor: 'bg-accent',
      numberOfQuestion: 10,
      categoryAvatarSrc: 'assets/icons/profile-1.svg',
    },
    {
      category: 'Easter Emoji Quiz: Can You Get 100 Percent?',
      cardColor: 'bg-warning',
      numberOfQuestion: 8,
      categoryAvatarSrc: 'assets/icons/profile-2.svg',
    },
    {
      category: 'London Underground & Tube Station Emoji Quiz',
      cardColor: 'bg-success',
      numberOfQuestion: 12,
      categoryAvatarSrc: 'assets/icons/profile-3.svg',
    },
    {
      category: 'Trivia Quiz: Guess The WWE Star From The Emoji!',
      cardColor: 'bg-error',
      numberOfQuestion: 15,
      categoryAvatarSrc: 'assets/icons/profile-4.svg',
    },
    {
      category: 'Quiz: Can You Guess Which Celebs Have Had an Emoji Make-Over?',
      cardColor: 'bg-muted',
      numberOfQuestion: 7,
      categoryAvatarSrc: 'assets/icons/profile-1.svg',
    },
    {
      category: 'Cryptic Christmas Movie Emoji Quiz: Guess them All!',
      cardColor: 'bg-success',
      numberOfQuestion: 10,
      categoryAvatarSrc: 'assets/icons/profile-2.svg',
    },
    {
      category: 'What Emoji Am I? Quiz',
      cardColor: 'bg-accent',
      numberOfQuestion: 14,
      categoryAvatarSrc: 'assets/icons/profile-1.svg',
    },
    {
      category: 'Trivia Quiz:Can You Guess the Fortnite Skin by the Emoji?',
      cardColor: 'bg-success',
      numberOfQuestion: 9,
      categoryAvatarSrc: 'assets/icons/profile-3.svg',
    },
    {
      category: 'Guess The Emoji Quiz',
      cardColor: 'bg-error',
      numberOfQuestion: 11,
      categoryAvatarSrc: 'assets/icons/profile-1.svg',
    },
    {
      category: 'Emoji Bands Quiz!',
      cardColor: 'bg-warning',
      numberOfQuestion: 5,
      categoryAvatarSrc: 'assets/icons/profile-4.svg',
    },
  ];
}
