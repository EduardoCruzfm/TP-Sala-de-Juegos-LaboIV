import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, onAuthStateChanged, User  } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

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

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user :User | null) => {

      if (user) {
        // this.userLoggedIn = !!user; // Actualizar estado según autenticación
        this.userLoggedIn = true; 
        this.userEmail = user.email;    // Obtener el correo del usuario
      } else {
        this.userLoggedIn = false; 
        this.userEmail = null;    // Limpiar el correo si no está autenticado
      }

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
    this.auth.signOut().then(() => {
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
