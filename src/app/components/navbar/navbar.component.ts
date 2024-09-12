import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}  // Inyectar el Router
  
  home(){
      this.router.navigate(['/home']).then(() => {
        this.scrollToSection('nav');
      }); 
     }

  quienSoy(){  this.router.navigate(['/quien-soy']);  }

  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  cerrarSecion(){
    this.router.navigate(['/']);
  }

}
