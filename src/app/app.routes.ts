import { Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    title: 'Main Page',
  },
  {
    path: '**',
    redirectTo: 'main',
  }
];
