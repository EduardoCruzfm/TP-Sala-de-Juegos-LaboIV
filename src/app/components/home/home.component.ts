import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Variable para almacenar el correo del usuario
  public userEmail: string | null = null;

  constructor( private viewportScroller: ViewportScroller, private router: Router) {
    this.router.events.subscribe((event) => {
      
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Desplaza al inicio de la página
      }
    });
  } // Inyectar el Router

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
