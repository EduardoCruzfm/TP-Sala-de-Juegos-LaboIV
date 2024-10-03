import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './menu-preguntados.component.html',
  styleUrl: './menu-preguntados.component.css'
})
export class MenuPreguntadosComponent {



  constructor(private router: Router) {}

  // Mapeo de categorías a sus respectivos valores
  categorias = [
    { nombre: 'geography', id: 22 },
    { nombre: 'film', id: 11 },
    { nombre: 'games', id: 15 },
    { nombre: 'art', id: 25 }
  ];

  // Función para manejar la selección de la categoría
  seleccionarCategoria(categoria: { nombre: string, id: number }) {
    // Redirige pasando el id y el nombre como parte de la URL
    this.router.navigate(['/preguntados', categoria.id, categoria.nombre]);
  }
  
}
