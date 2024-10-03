import { Component, inject } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { ChangeDetectorRef } from '@angular/core'; // Importar ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {
  apiRequestS = inject(ApiRequestService);
  cdr = inject(ChangeDetectorRef);
  preguntas: any[] = [];
  preguntaActual: any = {};
  respuestaCorrecta: string = '';
  respuestas: string[] = [];
  puntos: number = 0;
  juegoTerminado: boolean = false;
  mensajeResultado: string = '';
  indicePregunta: number = 0;
  categoriaId: number = 0;
  categoriaNombre: string = "";
  imagenes: any[] = []; // Almacena las imágenes

  constructor(private route: ActivatedRoute) {

    // Obtener el ID de la categoría de la URL
    this.route.params.subscribe(params => {
      this.categoriaId = +params['categoriaId']; // Convertir a número
      this.categoriaNombre = params['categoriaNombre'];
    });

    // Obtener preguntas
    this.apiRequestS.traerPreguntas(this.categoriaId).subscribe((response: any) => {

      if (response && response.results && response.results.length > 0) {
        this.preguntas = response.results.map((pregunta: any) => ({
          pregunta: this.decodeHTMLEntities(pregunta.question),
          respuestaCorrecta: this.decodeHTMLEntities(pregunta.correct_answer),
          respuestas: [this.decodeHTMLEntities(pregunta.correct_answer), 
            ...pregunta.incorrect_answers.map((answer: string) => this.decodeHTMLEntities(answer))].sort(() => 0.5 - Math.random())
        }));
        
        // Comenzar con la primera pregunta
        this.cargarImagenes(this.categoriaNombre || 'games'); 
        // console.log("categoria " + this.preguntas[0].pregunta);
        this.cargarPreguntaActual();
      }
    });
  }

  // Nueva función para cargar imágenes
  cargarImagenes(categoria: string) {
    this.apiRequestS.traerImagenes(categoria).subscribe((response: any) => {
      if (response && response.results) {
        this.imagenes = response.results; // Almacenar imágenes
        console.log(this.imagenes[0].urls.small);
      }
    });
  }

  decodeHTMLEntities(text: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }

  respuestaSeleccionada(respuesta: string) {
    if (respuesta === this.respuestaCorrecta) {
      this.puntos++;
      this.mensajeResultado = "¡Ganaste!";
      console.log(this.mensajeResultado);
      this.cargarSiguientePregunta();
    } else {
      this.mensajeResultado = "Perdiste, la respuesta correcta era: " + this.respuestaCorrecta;
      console.log(this.mensajeResultado);
      this.cargarSiguientePregunta();
      this.juegoTerminado = true;
    }
    this.cdr.detectChanges();
  }

  cargarPreguntaActual() {
    if (this.indicePregunta < this.preguntas.length) {
      const preguntaObj = this.preguntas[this.indicePregunta];
      this.preguntaActual = preguntaObj.pregunta;
      this.respuestaCorrecta = preguntaObj.respuestaCorrecta;
      this.respuestas = preguntaObj.respuestas;
      this.juegoTerminado = false;
      this.mensajeResultado = '';
    } else {
      this.juegoTerminado = true;
    }
    this.cdr.detectChanges();
  }

  cargarSiguientePregunta() {
    this.indicePregunta++;
    if (this.indicePregunta < this.preguntas.length) {
      this.cargarPreguntaActual();
    } else {
      this.juegoTerminado = true;
    }
    this.cdr.detectChanges();
  }

  volverAJugar() {
    this.puntos = 0;
    this.indicePregunta = 0;  // Reiniciar el índice
    this.cargarPreguntaActual();  // Reiniciar desde la primera pregunta
    this.cdr.detectChanges();
  }
}
