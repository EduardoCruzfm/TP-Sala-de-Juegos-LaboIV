import { Component } from '@angular/core';
import {FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {} // Inyectar el Router

  usuarioAdmin() {
    this.form.patchValue({
      email: 'admin@example.com',
      password: 'admin123',
    });
  }

  usuarioGerente(){
    this.form.patchValue({
      email: 'gerente@example.com',
      password: 'gerente123'
    });
  }

  usuarioEmpleado(){
    this.form.patchValue({
      email: 'empleado@example.com',
      password: 'empleado123'
    });
  }

  // Login
  async handleLogin() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      if (typeof email === 'string' && typeof password === 'string') {
        try {
           // Usar el AuthService para manejar el inicio de sesión
          await this.authService.login(email, password);
          this.form.get('email')?.setValue('');
          this.form.get('password')?.setValue('');

          await Swal.fire({
            title: 'Éxito!',
            text: 'Inicio de sesión exitoso!',
            icon: 'success',
          });
          this.router.navigate(['/home']);
        } catch (error) {
          // Mostrar alerta en caso de error de autenticación
          await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo o contraseña incorrectos. Por favor, intenta de nuevo!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          console.error('Error al iniciar sesión:', error);
        }
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo electrónico o contraseña inválidos!',
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Formulario inválido!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  }
}
