import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import {
  Nota,
  CreateNotaDto,
  UpdateNotaDto,
  NotaEstadisticas,
  NotaPromedioCurso,
} from '../interfaces/nota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotaService extends BaseService<Nota> {
  // Señales para estadísticas
  private estadisticasSignal = signal<NotaEstadisticas | null>(null);
  private promediosCursosSignal = signal<NotaPromedioCurso[]>([]);

  readonly estadisticas = this.estadisticasSignal.asReadonly();
  readonly promediosCursos = this.promediosCursosSignal.asReadonly();

  constructor() {
    super();
    this.cargarEntidades('notas');
  }

  // Métodos específicos para Nota
  cargarNotas(): void {
    super.cargarEntidades('notas');
  }

  obtenerNotaPorId(id: number): Observable<Nota> {
    return super.obtenerEntidadPorId('notas', id);
  }

  crearNota(notaDto: CreateNotaDto): Observable<Nota> {
    return super.crearEntidad('notas', notaDto as any);
  }

  actualizarNota(id: number, notaDto: UpdateNotaDto): Observable<Nota> {
    return super.actualizarEntidad('notas', id, notaDto as any);
  }

  eliminarNota(id: number): Observable<void> {
    return super.eliminarEntidad('notas', id);
  }
}
