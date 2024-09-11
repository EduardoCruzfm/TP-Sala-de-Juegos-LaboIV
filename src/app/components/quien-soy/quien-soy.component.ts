import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

  constructor(private router: Router) {}  // Inyectar el Router

  home(){
    this.router.navigate(['/home']);
  
  }

}
