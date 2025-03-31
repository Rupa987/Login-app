import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((loggedIn: boolean) => {
      if (!loggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  ) as Observable<boolean>;
};
