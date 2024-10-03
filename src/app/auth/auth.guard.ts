import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.userLoggedIn$.pipe(
    take(1),  // Toma solo el primer valor emitido
    map(isLoggedIn => {
      console.log('Estado de autenticación en guard:', isLoggedIn);  // Log para depuración
      if (isLoggedIn) {
        return true;  // Usuario autenticado, permitir acceso
      } else {
        router.navigate(['/login']);  // Redirige si no está autenticado
        return false;
      }
    })
  );
};
