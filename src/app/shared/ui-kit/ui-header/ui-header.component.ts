import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'quiz-ui-header',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, UiButtonComponent, SvgIconComponent ],
  templateUrl: './ui-header.component.html',
})
export class UiHeaderComponent {
  isMenuOpen = signal(false);

  navItems = [
    { label: 'Home', link: '' },
    { label: 'Catalog', link: 'catalog' },
  ];

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
