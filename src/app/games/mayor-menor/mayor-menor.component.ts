import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../../components/navbar/navbar.component'; 

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {

  

  cartas: Array<{ valor: number, palo: string, imagen: string }> = [ 
    // Oros
    { valor: 1, palo: 'oros', imagen: 'cartas/1.png' }, 
    { valor: 2, palo: 'oros', imagen: 'cartas/2.png' },
    { valor: 3, palo: 'oros', imagen: 'cartas/3.png' },
    { valor: 4, palo: 'oros', imagen: 'cartas/4.png' },
    { valor: 5, palo: 'oros', imagen: 'cartas/5.png' },
    { valor: 6, palo: 'oros', imagen: 'cartas/6.png' },
    { valor: 7, palo: 'oros', imagen: 'cartas/7.png' },
    { valor: 8, palo: 'oros', imagen: 'cartas/8.png' },
    { valor: 9, palo: 'oros', imagen: 'cartas/9.png' },
    { valor: 10, palo: 'oros', imagen: 'cartas/10.png' },
    { valor: 11, palo: 'oros', imagen: 'cartas/11.png' },
    { valor: 12, palo: 'oros', imagen: 'cartas/12.png' },
  ]

  cartaActual: { valor: number, palo: string, imagen: string } = this.cartas[0]; // Incluye 'imagen'
  cartaSiguiente: { valor: number, palo: string, imagen: string } | undefined;
  puntuacion: number = 0;
  finDelJuego: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.cartaActual = this.getCartaAleatoria();
    this.puntuacion = 0;
    this.finDelJuego = false;
  }

  getCartaAleatoria(): { valor: number, palo: string, imagen: string } {
    const randomIndex = Math.floor(Math.random() * this.cartas.length);
    return this.cartas[randomIndex];
  }
  
  adivinar(opcion: 'mayor' | 'menor'): void {
    this.cartaSiguiente = this.getCartaAleatoria();

    if (this.cartaSiguiente.valor === this.cartaActual.valor) {
      // Empate, continuar sin sumar puntos ni terminar el juego
      console.log('¡Empate! Continúa sin sumar puntos.');
    } else if (
      (opcion === 'mayor' && this.cartaSiguiente.valor > this.cartaActual.valor) ||
      (opcion === 'menor' && this.cartaSiguiente.valor < this.cartaActual.valor))
     {
      this.puntuacion++;
      console.log('¡Acierto! -> '  + this.cartaSiguiente.valor );
    } else {
      console.log('¡Fallaste! ->' + this.cartaSiguiente.valor );
      this.finDelJuego = true;
    }

    this.cartaActual = this.cartaSiguiente;
  }

  reiniciarJuego(): void {
    this.iniciarJuego();
  }
}
