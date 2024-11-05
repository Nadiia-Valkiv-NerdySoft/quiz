import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiButtonComponent } from '../ui-button/ui-button.component';

@Component({
  selector: 'quiz-ui-header',
  standalone: true,
  imports: [ RouterLink, UiButtonComponent ],
  templateUrl: './ui-header.component.html',
})
export class UiHeaderComponent {
  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'Catalog', link: '/catalog' },
    { label: 'Item', link: '/item' },
    { label: 'Item', link: '/item' },
    { label: 'Item', link: '/item' },
  ];
}
