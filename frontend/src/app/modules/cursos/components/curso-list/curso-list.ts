import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './curso-list.html',
})
export class CursoList implements OnInit {
  cursoService = inject(CursoService);
  private router = inject(Router);

  ngOnInit() {
    this.cursoService.cargarCursos();
  }

  navegarACrear() {
    this.router.navigate(['/cursos/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/cursos', id]);
  }

  editarCurso(id: number) {
    this.router.navigate(['/cursos/editar', id]);
  }

  eliminarCurso(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.cursoService
        .eliminarCurso(id)
        .pipe(
          catchError((error) => {
            console.error('Error al eliminar curso:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.cursoService.cargarCursos();
        });
    }
  }
}
