import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,RouterModule, SweetAlert2Module],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userLoggedIn: boolean = false; // Estado de autenticación
  userEmail: string | null = null; 

  constructor(private authService: AuthService, private viewportScroller: ViewportScroller, private router: Router) {
    // Suscribirse a los cambios de estado de autenticación
    this.authService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios de correo del usuario
    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Desplaza al inicio de la página
      }
    });
  } 

  async onLinkClick(event: MouseEvent, path: string) {
    event.preventDefault(); // Evita la acción predeterminada del enlace

    // La validación
    const isValid = this.validateUser();

    if (isValid) {
      this.router.navigate([path]);
    } else {

      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debe registrarse para poder juagar!',
        footer: `
        <div style="display: flex; flex-direction: column;">
          <a href="/login">Iniciar Sesión</a>
          <a href="/register">Registrarse</a>
        </div>
      `
      });
      console.log('Validación fallida');
    }
  }

  validateUser() {
    return this.userLoggedIn;
  }

  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
// afriadenrich
// facuCast

// ngOnInit(): void {
//   this.mostrarAlerta(); // Llama a la función para mostrar la alerta en ngOnInit
// }

// por si queres probar si anduvo bien
// mostrarAlerta() {
//   Swal.fire({
//     title: '¡Hola!',
//     text: 'Esta es una alerta de ejemplo en Angular con SweetAlert2 al inicializar el componente',
//     icon: 'success', // Icono de éxito
//     confirmButtonText: 'Aceptar'
//   });
