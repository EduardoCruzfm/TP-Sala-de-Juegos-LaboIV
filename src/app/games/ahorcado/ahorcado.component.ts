import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import palabrasData from './palabras.json'; 

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  palabras: string[] = palabrasData.palabras; // Usa el JSON importado

  palabraOriginal: string = ''; // Puedes elegir aleatoriamente o tener una lista de palabras
  palabraOculta: string[] = [];
  letras: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letrasSeleccionadas: string[] = [];
  imagenMuneco: string = 'ahorcado/a1.png'; // Imagen inicial del muñeco
  intentos: number = 0;
  maxIntentos: number = 6; // Puedes ajustar cuántos fallos permites
  juegoTerminado: boolean = false;
  ganador: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.palabraOriginal = this.seleccionarPalabraAleatoria();
    this.inicializarJuego();
  }

  seleccionarPalabraAleatoria(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indiceAleatorio]; // Selecciona una palabra aleatoria
  }

  inicializarJuego() {
    this.palabraOculta = Array(this.palabraOriginal.length).fill('_');
    this.letrasSeleccionadas = [];
    this.intentos = 1;
    this.imagenMuneco = 'ahorcado/a1.png';
    this.juegoTerminado = false;
    this.ganador = false;
  }

  seleccionarLetra(letra: string) {
    this.letrasSeleccionadas.push(letra);
    const letraEnPalabra = this.palabraOriginal.includes(letra);

    if (letraEnPalabra) {
      // Reemplazar los guiones por la letra correcta
      for (let i = 0; i < this.palabraOriginal.length; i++) {
        if (this.palabraOriginal[i] === letra) {
          this.palabraOculta[i] = letra;
        }
      }

      // Verificar si se ganó el juego
      if (!this.palabraOculta.includes('_')) {
        this.juegoTerminado = true;
        this.ganador = true;
      }
    } else {
      // Incrementar los fallos y actualizar la imagen del muñeco
      this.intentos++;
      this.imagenMuneco = `ahorcado/a${this.intentos}.png`;

      // Verificar si se perdió el juego
      if (this.intentos >= this.maxIntentos) {
        this.juegoTerminado = true;
        this.ganador = false;
      }
    }
  }

  reiniciarJuego() {
    this.palabraOriginal = this.seleccionarPalabraAleatoria();
    this.inicializarJuego();
  }
}
