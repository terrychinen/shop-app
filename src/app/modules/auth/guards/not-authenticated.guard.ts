import {CanMatchFn, Route, Router, UrlSegment} from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '@auth/services/auth.service';
import {firstValueFrom} from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[],
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(auth.checkStatus());

  if (isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
}
