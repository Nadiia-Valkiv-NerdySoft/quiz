import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'quiz-ui-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, UiButtonComponent ],
  templateUrl: './ui-header.component.html',
})
export class UiHeaderComponent {
  navItems = [
    { label: 'Home', link: 'home' },
    { label: 'Catalog', link: 'catalog' },
    { label: 'Quiz', link: 'quiz' },
    { label: 'Statistics', link: 'statistics' },
    { label: 'About', link: 'about' },
  ];

  isMenuOpen = false;

  closeMenu() {
    this.isMenuOpen = false;
  }
}
