import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';    // Variables para vincular a los inputs
  password: string = '';

  constructor(private router: Router) {}  // Inyectar el Router

  usuarioAdmin(){
    this.email = 'admin@example.com';
    this.password = 'admin123';
  }

  verificarLogin(){
    if (this.email === 'admin@example.com' && this.password === 'admin123') {
      // Redirigir al home
      this.router.navigate(['/home']);
    } else {
      // Manejar el error si las credenciales no son correctas
      alert('Credenciales incorrectas');
    }
  }
}
