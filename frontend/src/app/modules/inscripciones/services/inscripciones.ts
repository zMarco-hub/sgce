import { inject, Injectable, computed } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Inscripcion, CreateInscripcionDto } from '../interfaces/inscripcion';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService extends BaseService<Inscripcion> {
  // Señal computada para el total
  readonly total = computed(() => this.entities().length);

  constructor() {
    super();
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    super.cargarEntidades('inscripciones');
  }

  obtenerInscripcionPorId(id: number): Observable<Inscripcion> {
    return super.obtenerEntidadPorId('inscripciones', id);
  }

  crearInscripcion(inscripcionDto: CreateInscripcionDto): Observable<Inscripcion> {
    return super.crearEntidad('inscripciones', inscripcionDto as any);
  }

  eliminarInscripcion(id: number): Observable<void> {
    return super.eliminarEntidad('inscripciones', id).pipe(
      tap(() => {
        // Recargar después de eliminar (esto hace una nueva petición)
        this.cargarInscripciones();
      })
    );
  }

  // Método para verificar si ya existe una inscripción
  existeInscripcion(estudianteId: number, cursoId: number): boolean {
    return this.entities().some(
      (inscripcion) =>
        inscripcion.estudiante.id === estudianteId && inscripcion.curso.id === cursoId
    );
  }

  // Método para obtener inscripciones por estudiante
  obtenerPorEstudiante(estudianteId: number) {
    return computed(() =>
      this.entities().filter((inscripcion) => inscripcion.estudiante.id === estudianteId)
    );
  }

  // Método para obtener inscripciones por curso
  obtenerPorCurso(cursoId: number) {
    return computed(() =>
      this.entities().filter((inscripcion) => inscripcion.curso.id === cursoId)
    );
  }
}
