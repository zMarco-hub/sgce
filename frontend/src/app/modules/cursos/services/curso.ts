import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { Curso, CreateCursoDto, UpdateCursoDto } from '../interfaces/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends BaseService<Curso> {
  constructor() {
    super();
    this.cargarEntidades('cursos');
  }

  // Métodos específicos para Curso
  cargarCursos(): void {
    super.cargarEntidades('cursos');
  }

  obtenerCursoPorId(id: number): Observable<Curso> {
    return super.obtenerEntidadPorId('cursos', id);
  }

  crearCurso(cursoDto: CreateCursoDto): Observable<Curso> {
    return super.crearEntidad('cursos', cursoDto as any);
  }

  actualizarCurso(id: number, cursoDto: UpdateCursoDto): Observable<Curso> {
    return super.actualizarEntidad('cursos', id, cursoDto as any);
  }

  eliminarCurso(id: number): Observable<void> {
    return super.eliminarEntidad('cursos', id);
  }
}
