import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { EstudianteService } from '../../services/estudiante';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './estudiante-list.html',
})
export class EstudianteList implements OnInit {
  estudianteService = inject(EstudianteService);
  private router = inject(Router);

  ngOnInit() {
    this.estudianteService.cargarEstudiantes();
  }

  navegarACrear() {
    this.router.navigate(['/estudiantes/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/estudiantes', id]);
  }

  editarEstudiante(id: number) {
    this.router.navigate(['/estudiantes/editar', id]);
  }

  eliminarEstudiante(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      this.estudianteService
        .eliminarEstudiante(id)
        .pipe(
          catchError((error) => {
            console.error('Error al eliminar estudiante:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.estudianteService.cargarEstudiantes();
        });
    }
  }
}
