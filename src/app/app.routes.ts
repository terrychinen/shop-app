import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./modules/store-front/store-front.routes'),
  }
];
