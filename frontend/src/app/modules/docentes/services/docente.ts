import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Docente, CreateDocenteDto, UpdateDocenteDto } from '../interfaces/docente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocenteService extends BaseService<Docente> {
  constructor() {
    super();
    this.cargarEntidades('docente');
  }

  // Métodos específicos para Docente
  cargarDocentes(): void {
    super.cargarEntidades('docente');
  }

  obtenerDocentePorId(id: number): Observable<Docente> {
    return super.obtenerEntidadPorId('docente', id);
  }

  crearDocente(docenteDto: CreateDocenteDto): Observable<Docente> {
    return super.crearEntidad('docente', docenteDto as any);
  }

  actualizarDocente(id: number, docenteDto: UpdateDocenteDto): Observable<Docente> {
    return super.actualizarEntidad('docente', id, docenteDto as any);
  }

  eliminarDocente(id: number): Observable<void> {
    return super.eliminarEntidad('docente', id);
  }
}
