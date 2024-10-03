import { Component } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service'; 
import { inject, Injectable } from '@angular/core';
import { DatabaseService } from '../../services/database.service'; 
import { Usuario } from '../../classes/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {} 
  db = inject(DatabaseService);

  // Registrar
  async handleRegister() {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;

      if (typeof name === 'string' && typeof email === 'string' && typeof password === 'string') {
        try {

          // await this.authService.register(email, password);
          // const user = new Usuario(name,email);
          // this.db.agregarUsuario(user);
          
          await this.authService.register(email,password)
          .then((userCredential) => {
            const userId = userCredential.user?.uid;
            
            // Agregar el nombre y otros detalles a Firestore
            if (userId) {
              const usuario = new Usuario(name,email,userId);
              this.db.agregarUsuario(usuario);
            }
          });
          
          await Swal.fire({
            title: 'Éxito!',
            text: 'Registro exitoso!',
            icon: 'success',
          });
          this.router.navigate(['/home']);
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            // Manejo específico cuando el correo ya está registrado
            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El correo electrónico ya está en uso!',
            });
          } else {
            await Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al registrarse. Por favor, intenta de nuevo!',
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
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
