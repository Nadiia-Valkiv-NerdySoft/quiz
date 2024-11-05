import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/components/main/main.component';
import { CatalogComponent } from './pages/catalog/components/catalog/catalog.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'catalog', component: CatalogComponent },
];
