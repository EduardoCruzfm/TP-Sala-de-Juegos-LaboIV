import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userLoggedIn: boolean = false;      // Estado de autenticación
  userEmail: string | null = null;    // Variable para almacenar el correo del usuario

  constructor(private authService: AuthService, private router: Router) {
    // Suscribirse a los cambios de estado de autenticación
    this.authService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios de correo del usuario
    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  home() {
    this.router.navigate(['/home']).then(() => {
      this.scrollToSection('nav');
    });
  }

  quienSoy() {
    this.router.navigate(['/quien-soy']);
  }

  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  cerrarSesion() {
    this.authService.logout().then(() => {
      this.router.navigate(['/home']); // Redirige al home después de cerrar sesión
    });
  }

  iniciarSesion() {
    this.router.navigate(['/login']); // Redirige al login
  }

  registrarse() {
    this.router.navigate(['/register']); // Redirige a la página de registro
  }
}
