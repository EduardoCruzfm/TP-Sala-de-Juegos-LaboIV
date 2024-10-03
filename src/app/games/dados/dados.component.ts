import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dados.component.html',
  styleUrl: './dados.component.css'
})
export class DadosComponent {
  resultado: string = ''; // Mensaje de resultado del juego
  punto: number | null = null; // El "punto" si no se gana o pierde en el primer tiro
  dados: number[] = []; // Los valores de los dos dados
  imagenes: Array<{ valor: number, imagen: string }> = [ 
    { valor: 1, imagen: 'dados/7.png' },
    { valor: 2, imagen: 'dados/1.png' }, 
    { valor: 3, imagen: 'dados/2.png' },
    { valor: 4, imagen: 'dados/3.png' },
    { valor: 5, imagen: 'dados/4.png' },
    { valor: 6, imagen: 'dados/5.png' },
    { valor: 7, imagen: 'dados/6.png' }
  ];
  dadoUno : { valor: number, imagen: string } = this.imagenes[1]; 
  dadoDos : { valor: number, imagen: string } = this.imagenes[1]; 

  // Función para lanzar los dados
  lanzarDados(): number[] {
    return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
  }

  // Lógica del juego
  jugar() {
    this.dados = this.lanzarDados(); 
    const suma = this.dados[0] + this.dados[1]; // Sumar los dos dados
    this.dadoUno = this.imagenes[this.dados[0]]
    this.dadoDos = this.imagenes[this.dados[1]]
    console.log(this.dados[0] , this.dados[1])

    if (this.punto === null) {
      // Primer tiro
      if (suma === 7 || suma === 11) {
        this.resultado = '¡Ganaste!';
      } else if (suma === 2 || suma === 3 || suma === 12) {
        this.resultado = '¡Perdiste!';
      } else {
        this.punto = suma; // Establecer el "punto"
        this.resultado = `Tu punto es ${this.punto}. Debes sacar ${this.punto} antes de un 7 para ganar.`;
      }
    } else {
      // Tiros posteriores (ya existe un "punto")
      if (suma === this.punto) {
        this.resultado = '¡Ganaste al sacar tu punto de nuevo!';
        this.punto = null; // Reiniciar el juego
      } else if (suma === 7) {
        this.resultado = '¡Seven Out! Perdiste la apuesta.';
        this.punto = null; // Reiniciar el juego
      } else {
        this.resultado = `Sacaste ${suma}. Sigue tirando para sacar ${this.punto}.`;
      }
    }
  }
}
