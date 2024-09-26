import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore/lite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  usuarios: Usuario[]= [];

  constructor(private firestore: AngularFirestore) { }

  agregarUsuario(user: Usuario){
    const collectionUsuarios = this.firestore.collection("usuarios");
    collectionUsuarios.add({ ...user});
  }

  traerUsuario(){
    const collectionUsuarios = this.firestore.collection("usuarios");
    
    // const observable = collectionUsuarios.get();
    // obserbable.subscribe((response) => {
    //   response.docs.forEach((documento) => {
    //     console.log(documento.data());
    //   });
    // });
  
    const observable = collectionUsuarios.valueChanges();
    observable.subscribe((response) => {
      // console.log(response);
      this.usuarios = response as Usuario[];
    })
  };

}
