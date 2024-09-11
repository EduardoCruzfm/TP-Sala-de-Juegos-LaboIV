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
  
  home(){  this.router.navigate(['/home']);  }

  quienSoy(){  this.router.navigate(['/quien-soy']);  }
}
