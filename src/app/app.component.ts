import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { inject, Injectable } from '@angular/core';
import { ApiRequestService } from './services/api-request.service';
import { percentage } from '@angular/fire/storage';
import { Usuario } from './classes/usuario';
import { Subscription } from 'rxjs';//


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TpSprint';
  datosRecibidos :any = "";
  usuarios: Usuario[]= [];
  subscription: Subscription | null = null;

  constructor(){}

  db = inject(DatabaseService);
  // apiRequestS = inject(ApiRequestService);
  
  ngOnInit(){
    // const peticion = this.apiRequestS.traerUsuario("EduardoCruzfm");
    
    // peticion.subscribe((response) => {
    //   this.datosRecibidos = response;
    //   console.log(response);
    // })

    const observable = this.db.traerUsuario();
    this.subscription = observable.subscribe((resultado) => {
      console.log(resultado);
      this.usuarios = resultado as Usuario[];
    });

    console.log("inicio");
    this.db.traerUsuario();

    //   const user = new Usuario('Eduardo','edu@gmail.com');
  //   this.db.agregarUsuario(user);

  }
}
