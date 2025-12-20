import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DocenteService } from '../../services/docente';

@Component({
  selector: 'app-docente-list',
  standalone: true, // Agregar standalone
  imports: [CommonModule, RouterModule], // Importar módulos necesarios
  templateUrl: './docente-list.html', // Agregar .component
  // Cambiar styleUrl a styleUrls
})
export class DocenteList implements OnInit {
  docenteService = inject(DocenteService);
  private router = inject(Router);

  ngOnInit() {
    this.docenteService.cargarDocentes();
  }

  navegarACrear() {
    this.router.navigate(['/docentes/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/docentes', id]);
  }

  editarDocente(id: number) {
    this.router.navigate(['/docentes/editar', id]);
  }

  eliminarDocente(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      this.docenteService
        .eliminarDocente(id)
        .pipe(
          catchError((error) => {
            console.error('Error al eliminar docente:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.docenteService.cargarDocentes();
        });
    }
  }
}
