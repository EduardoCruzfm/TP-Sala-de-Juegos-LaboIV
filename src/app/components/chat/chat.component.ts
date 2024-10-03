import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Firestore, collection, addDoc, query, orderBy, limit, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  user: any = null; // Almacena el objeto usuario
  messages: Observable<any[]> = new Observable(); // Inicializa como un Observable vacío
  messageText: string = '';
  userName: string | null = '';  // Para almacenar el nombre del usuario

  @ViewChild('chatWindow') chatWindow!: ElementRef; // Referencia a la ventana del chat

  constructor(private authService: AuthService, private firestore: Firestore) {}

  async ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.userEmail$.subscribe(async (email) => {
      if (email) {
        const user = await this.authService.getCurrentUser(); // Obtener el usuario actual
        if (user) {
          console.log("UID " + user.uid);

          this.user = { email }; // Almacenar el email del usuario
          this.userName = await this.obtenerNombreUsuario(user.uid); // Obtener el nombre del usuario por UID
          this.loadMessages(); // Cargar mensajes del chat
        }
      } else {
        this.userName = null; 
        this.user = null; 
      }
    });
  }

  // Método para obtener el nombre del usuario desde Firestore usando su UID
  async obtenerNombreUsuario(uid: string): Promise<string> {
    const docRef = doc(this.firestore, 'usuarios', uid); // Busca el documento usando el UID del usuario
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Nombre del usuario:', data['nombre']);
      return data['nombre']; // Retorna el nombre del usuario
    } else {
      console.log('No se encontró el usuario en la base de datos.');
      return '';
    }
  }

  loadMessages() {
    const messagesRef = collection(this.firestore, 'chatMessages');
    const q = query(messagesRef, orderBy('timestamp'), limit(20));
    this.messages = collectionData(q, { idField: 'id' });

    setTimeout(() => {
      this.scrollToBottom();
    },0);
  }

  sendMessage() {
    if (this.messageText.trim() !== '') { // Asegúrate de que userName no sea nulo
      const messagesRef = collection(this.firestore, 'chatMessages');
      addDoc(messagesRef, {
        text: this.messageText,
        user: this.userName, // Guarda el nombre del usuario en vez del email
        timestamp: new Date() // Guarda la fecha y hora del mensaje
      });
      console.log(this.messageText)

      this.messageText = ''; // Limpiar el campo de texto

       // Desplazar automáticamente al final de la ventana de chat
       setTimeout(() => {
        this.scrollToBottom();
      },0);
    }
  }

  scrollToBottom() {
    if (this.chatWindow && this.chatWindow.nativeElement) {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
      console.log("Desplazando al final:", this.chatWindow.nativeElement.scrollHeight);
    } else {
      console.log("chatWindow no está disponible.");
    }
  }
  
  
}
