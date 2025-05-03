import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes'),
    canMatch: [
      notAuthenticatedGuard,
    ],
  },
  {
    path: '',
    loadChildren: () => import('./modules/store-front/store-front.routes'),
  }
];
