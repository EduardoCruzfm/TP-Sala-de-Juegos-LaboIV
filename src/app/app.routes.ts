import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige la ruta raíz a "login"
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'quien-soy',
    loadComponent: () =>
      import('./components/quien-soy/quien-soy.component').then(
        (m) => m.QuienSoyComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'mayor-menor',
    loadComponent: () =>
      import('./games/mayor-menor/mayor-menor.component').then(
        (m) => m.MayorMenorComponent
      ),
  },
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./games/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
  },
  {
    path: 'chat',
    loadComponent: () => 
      import('./components/chat/chat.component').then(m => m.ChatComponent),
    // canActivate: [authGuard], // Aplica la guarda aquí
  },
  {
    path: 'dados',
    loadComponent: () => 
      import('./games/dados/dados.component').then(m => m.DadosComponent),
  },
  {
    path: 'menu_preguntados',
    loadComponent: () => 
      import('./games/menu-preguntados/menu-preguntados.component').then(m => m.MenuPreguntadosComponent),
  },
  {
    path: 'preguntados/:categoriaId/:categoriaNombre',
    loadComponent: () => 
      import('./games/preguntados/preguntados.component').then(m => m.PreguntadosComponent),
  },
  {
    path: '**', //Comodin de error -> hacer page de error
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
];

// allow read, write: if true;