import { Component } from '@angular/core';
// import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

import { ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private viewportScroller: ViewportScroller,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Desplaza al inicio de la página
      }
    });
  }  // Inyectar el Router


  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

}
