import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiHeaderComponent } from './shared/ui-kit/ui-header/ui-header.component';
import { MainComponent } from './pages/main/components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, UiHeaderComponent, MainComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
