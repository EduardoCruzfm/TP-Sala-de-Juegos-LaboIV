import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,RouterModule, SweetAlert2Module],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userLoggedIn: boolean = false; // Estado de autenticación
  userEmail: string | null = null; // Variable para almacenar el correo del usuario

  constructor(private auth: Auth, private viewportScroller: ViewportScroller, private router: Router) {

    onAuthStateChanged(this.auth, (user: User | null) => {
      this.userLoggedIn = !!user; // Actualizar estado según autenticación
      this.userEmail = user ? user.email : null; // Obtener el correo del usuario
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Desplaza al inicio de la página
      }
    });
  } 

  async onLinkClick(event: MouseEvent, path: string) {
    event.preventDefault(); // Evita la acción predeterminada del enlace

    // Realiza aquí la validación
    const isValid = this.validateUser();
    if (isValid) {
      this.router.navigate([path]);
    } else {

      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debe registrarse para poder juagar!',
        footer: '<a href="/register">Registrarse!</a>',
      });
      console.log('Validación fallida');
    }
  }

  validateUser() {
    if (this.userLoggedIn) {
      return true;
    } else {
      return false;
  }}

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
