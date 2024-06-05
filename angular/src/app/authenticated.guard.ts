import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.authenticated
    ? true
    : inject(Router).createUrlTree(['/signin']);
};

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(!authService.authenticated);

  return !authService.authenticated
    ? true
    : inject(Router).createUrlTree(['/']);
};
