import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, orderBy, limit, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {
  user: any = null;
  messages: Observable<any[]> = new Observable(); // Inicializa como un Observable vacío
  messageText: string = '';

  constructor(private auth: Auth, private firestore: Firestore) {}

  ngOnInit() {
    // Verificar si el usuario está logueado
    const authInstance = getAuth();
    onAuthStateChanged(authInstance, (user) => {
      if (user) {
        this.user = user; // Usuario logueado
        this.loadMessages(); // Cargar mensajes del chat
      } else {
        this.user = null;
        // Redirigir a login o mostrar mensaje de error
      }
    });
  }

  loadMessages() {
    const messagesRef = collection(this.firestore, 'chatMessages');
    const q = query(messagesRef, orderBy('timestamp'), limit(20));
    this.messages = collectionData(q, { idField: 'id' });
  }

  sendMessage() {
    if (this.messageText.trim() !== '') {
      const messagesRef = collection(this.firestore, 'chatMessages');
      addDoc(messagesRef, {
        text: this.messageText,
        user: this.user.email, // Guarda el email o nombre del usuario
        timestamp: new Date() // Guarda la fecha y hora del mensaje
      });
      this.messageText = ''; // Limpiar el campo de texto
    }
  }
}
