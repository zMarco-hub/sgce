import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Estudiante, CreateEstudianteDto, UpdateEstudianteDto } from '../interfaces/estudiante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService extends BaseService<Estudiante> {
  constructor() {
    super();
    this.cargarEntidades('estudiante');
  }

  // Métodos específicos para Estudiante
  cargarEstudiantes(): void {
    super.cargarEntidades('estudiante');
  }

  obtenerEstudiantePorId(id: number): Observable<Estudiante> {
    return super.obtenerEntidadPorId('estudiante', id);
  }

  crearEstudiante(estudianteDto: CreateEstudianteDto): Observable<Estudiante> {
    return super.crearEntidad('estudiante', estudianteDto as any);
  }

  actualizarEstudiante(id: number, estudianteDto: UpdateEstudianteDto): Observable<Estudiante> {
    return super.actualizarEntidad('estudiante', id, estudianteDto as any);
  }

  eliminarEstudiante(id: number): Observable<void> {
    return super.eliminarEntidad('estudiante', id);
  }
}
