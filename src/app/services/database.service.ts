import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  

  constructor(private firestore: AngularFirestore) { }

  async agregarUsuario(user: Usuario) {
    try {
      // Crear una referencia al documento, usando el uid del usuario como ID del documento
      const userDocRef = this.firestore.collection('usuarios').doc(user.id); 

      // Guardar el documento en Firestore
      await userDocRef.set({ ...user });

      console.log('Usuario agregado exitosamente con ID:', user.id);
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  }

  // agregarUsuario(user: Usuario){
  //   const collectionUsuarios = this.firestore.collection("usuarios");
  //   //UID del usuario como el ID del documento
  //   // collectionUsuarios.doc(user.id).set({ ...user })
   
    
  //   const documento = collectionUsuarios.doc();
  //   user.id = documento.ref.id;
  //   documento.set({ ...user })

  //   // collectionUsuarios.add({ ...user});
  // }

  traerUsuario(){
    const collectionUsuarios = this.firestore.collection("usuarios");
    
    // const observable = collectionUsuarios.get();
    // obserbable.subscribe((response) => {
    //   response.docs.forEach((documento) => {
    //     console.log(documento.data());
    //   });
    // });
    const observable = collectionUsuarios.valueChanges();
  
    // observable.subscribe((response) => {
    //   // console.log(response);
    //   this.usuarios = response as Usuario[];
    // })
    return observable;
  }

  modificar(usuario: Usuario){
    const collectionUsuarios = this.firestore.collection("usuarios");
    const documento = collectionUsuarios.doc(usuario.id);
    documento.update({... usuario});
  }

  eliminar(usuario: Usuario){
    const collectionUsuarios = this.firestore.collection("usuarios");
    const documento = collectionUsuarios.doc(usuario.id);
    documento.delete();
  }

  async obtenerUsuarioPorId(uid: string): Promise<any> {
    try {
      // Realiza la consulta donde el campo 'id' sea igual al UID que recibes
      const collectionUsuarios = this.firestore.collection('usuarios', ref => ref.where('id', '==', uid));
  
      const querySnapshot = await collectionUsuarios.get().toPromise(); // Ejecuta la consulta
  
      // Si el querySnapshot existe y no está vacío
      if (querySnapshot && !querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // Obtiene el primer documento que coincide
  
        // Obtén los datos del documento y defínelo como tipo 'any' para evitar el error de 'unknown'
        const data: any = docSnap.data();
  
        console.log('Usuario encontrado:', data['nombre']); // Asegúrate de que 'nombre' existe en los datos
        return data; // Devuelve los datos del usuario
      } else {
        console.log('No se encontró el usuario con el UID proporcionado.');
        return null;
      }
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
      return null;
    }
  }
  
  
}
