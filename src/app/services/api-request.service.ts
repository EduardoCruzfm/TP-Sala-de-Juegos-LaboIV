import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  http = inject(HttpClient); 
  apiUrl = "https://api.github.com/users/";
  datos :any = {};

  constructor() { }
  
  traerUsuario(usuario : string){
    const peticion = this.http.get(this.apiUrl + usuario,{
      responseType :"json"
    });

    return peticion;

    // peticion.subscribe((response)=> {
    //   console.log(response);
    //   this.datos = response;
    // })
  }
}
