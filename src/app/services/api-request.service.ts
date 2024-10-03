import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  http = inject(HttpClient); 
  apiUrl = "https://api.github.com/users/";
  datos :any = {};
  unsplashApiUrl = "https://api.unsplash.com/search/photos";
  unsplashAccessKey = "f0m64G-UyeOT6LlEBCWRgW0-xhKaDpmIEXKPHiK0joY";


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

  traerPreguntas(categoriaId: number){
    const peticion = this.http.get(`https://opentdb.com/api.php?amount=5&category=${categoriaId}&difficulty=easy&type=multiple` ,{
        responseType :"json"
      });
  
      return peticion;
  }

  traerImagenes(categoria: string) {
    const peticion = this.http.get(`${this.unsplashApiUrl}?query=${categoria}&client_id=${this.unsplashAccessKey}`, {
      responseType: "json"
    });
    return peticion;
  }
}
