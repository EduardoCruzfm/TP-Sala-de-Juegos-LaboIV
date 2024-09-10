import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige la ruta raíz a "login"
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then( m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then( m => m.HomeComponent)
  },
  {
    path: 'quien-soy',
    loadComponent: () => import('./components/quien-soy/quien-soy.component').then( m => m.QuienSoyComponent)
  }
];
