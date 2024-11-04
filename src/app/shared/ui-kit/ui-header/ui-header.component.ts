import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'quiz-ui-header',
  standalone: true,
  imports: [RouterLink],
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
