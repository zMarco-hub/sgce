import { inject, Injectable, computed } from '@angular/core';
import { BaseService } from '../../../core/services/base.service';
import { Evaluacion, CreateEvaluacionDto, UpdateEvaluacionDto } from '../interfaces/evaluacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService extends BaseService<Evaluacion> {
  // Tipos de evaluación disponibles
  readonly tipos = ['EXAMEN', 'TRABAJO_PRACTICO', 'PROYECTO', 'PARTICIPACION', 'OTRO'] as const;

  // Señales computadas
  readonly total = computed(() => this.entities().length);
  readonly evaluacionesActivas = computed(() => this.entities().filter((e) => e.activo));

  // Señal computada para evaluaciones próximas (7 días por defecto)
  readonly evaluacionesProximas = computed(() => {
    const dias = 7;
    const hoy = new Date();
    const limite = new Date();
    limite.setDate(hoy.getDate() + dias);

    return this.entities()
      .filter((e) => {
        const fechaEvaluacion = new Date(e.fecha);
        return fechaEvaluacion >= hoy && fechaEvaluacion <= limite;
      })
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  });

  constructor() {
    super();
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(): void {
    super.cargarEntidades('evaluaciones');
  }

  obtenerEvaluacionPorId(id: number): Observable<Evaluacion> {
    return super.obtenerEntidadPorId('evaluaciones', id);
  }

  crearEvaluacion(evaluacionDto: CreateEvaluacionDto): Observable<Evaluacion> {
    return super.crearEntidad('evaluaciones', evaluacionDto as any);
  }

  actualizarEvaluacion(id: number, evaluacionDto: UpdateEvaluacionDto): Observable<Evaluacion> {
    return super.actualizarEntidad('evaluaciones', id, evaluacionDto as any);
  }

  eliminarEvaluacion(id: number): Observable<void> {
    return super.eliminarEntidad('evaluaciones', id);
  }

  // Métodos de búsqueda
  obtenerEvaluacionesPorCurso(cursoId: number) {
    return computed(() => this.entities().filter((e) => e.curso.id === cursoId));
  }

  obtenerEvaluacionesPorTipo(tipo: string) {
    return computed(() => this.entities().filter((e) => e.tipo === tipo));
  }

  obtenerEvaluacionesActivasPorCurso(cursoId: number) {
    return computed(() => this.entities().filter((e) => e.curso.id === cursoId && e.activo));
  }

  // Método para formatear ponderación
  formatearPonderacion(ponderacion: number): string {
    return `${ponderacion}%`;
  }
}
