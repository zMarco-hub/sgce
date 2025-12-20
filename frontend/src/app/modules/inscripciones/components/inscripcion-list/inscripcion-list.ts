import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Inscripcion } from '../../interfaces/inscripcion';
import { InscripcionService } from '../../services/inscripciones';

@Component({
  selector: 'app-inscripcion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscripcion-list.html',
})
export class InscripcionList implements OnInit {
  private router = inject(Router);
  inscripcionService = inject(InscripcionService);

  // Computada para obtener todas las inscripciones (sin filtro)
  inscripciones = computed(() => this.inscripcionService.entities());

  // Computada para verificar si hay inscripciones
  tieneInscripciones = computed(() => this.inscripciones().length > 0);

  // Computada para el total (simplemente usar inscripciones().length)
  totalInscripciones = computed(() => this.inscripciones().length);

  ngOnInit() {
    this.inscripcionService.cargarInscripciones();
  }

  navegarACrear() {
    this.router.navigate(['/inscripciones/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/inscripciones', id]);
  }

  editarInscripcion(id: number) {
    this.router.navigate(['/inscripciones/editar', id]);
  }

  eliminarInscripcion(id: number) {
    const inscripcion = this.inscripcionService.entities().find((i) => i.id === id);

    if (!inscripcion) {
      return;
    }

    const confirmMessage = `¿Estás seguro de que deseas eliminar la inscripción de ${inscripcion.estudiante.usuario.nombre} ${inscripcion.estudiante.usuario.apellido} en el curso ${inscripcion.curso.nombre}?`;

    if (confirm(confirmMessage)) {
      this.inscripcionService.eliminarInscripcion(id).subscribe({
        error: (error) => {
          console.error('Error al eliminar inscripción:', error);
        },
      });
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'ACTIVA':
        return 'text-green-400 border-green-400 bg-green-900/20';
      case 'CANCELADA':
        return 'text-red-400 border-red-400 bg-red-900/20';
      case 'COMPLETADA':
        return 'text-blue-400 border-blue-400 bg-blue-900/20';
      default:
        return 'text-gray-400 border-gray-400';
    }
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'ACTIVA':
        return '✓';
      case 'CANCELADA':
        return '✗';
      case 'COMPLETADA':
        return '🏁';
      default:
        return '•';
    }
  }

  getNotaColor(nota: number): string {
    if (nota >= 14) return 'text-green-400';
    if (nota >= 10) return 'text-yellow-400';
    return 'text-red-400';
  }

  // Método para formatear fecha
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  // Método para limpiar errores
  limpiarError() {
    this.inscripcionService.limpiarError();
  }

  // Método para recargar datos
  recargar() {
    this.inscripcionService.cargarInscripciones();
  }
}
