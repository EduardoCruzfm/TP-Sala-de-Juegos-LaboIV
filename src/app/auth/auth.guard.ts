import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return new Promise<boolean>((resolve) => {
    // Observa el estado de autenticación de manera asíncrona
    const subscription = authService.userLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        resolve(true); // Usuario autenticado
      } else {
        router.navigate(['/login']); // Redirigir al login si no está autenticado
        resolve(false);
      }
      subscription.unsubscribe(); // Desuscribirse después de verificar
    });
  });
};
