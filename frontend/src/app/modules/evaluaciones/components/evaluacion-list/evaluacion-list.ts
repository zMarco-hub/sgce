import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evaluacion } from '../../interfaces/evaluacion';
import { EvaluacionService } from '../../services/evaluacion';

@Component({
  selector: 'app-evaluacion-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion-list.html',
})
export class EvaluacionList implements OnInit {
  private router = inject(Router);
  evaluacionService = inject(EvaluacionService);

  // Filtros
  filtroActivo = signal<boolean | null>(null);
  filtroTipo = signal<string>('TODOS');
  filtroCurso = signal<string>('TODOS');

  // Señales computadas
  tiposFiltro = computed(() => ['TODOS', ...this.evaluacionService.tipos]);
  cursosUnicos = computed(() => {
    const cursos = this.evaluacionService.entities().map((e) => e.curso.nombre);
    return ['TODOS', ...Array.from(new Set(cursos))];
  });

  evaluacionesFiltradas = computed(() => {
    let evaluaciones = this.evaluacionService.entities();

    // Filtrar por estado activo/inactivo
    if (this.filtroActivo() !== null) {
      evaluaciones = evaluaciones.filter((e) => e.activo === this.filtroActivo());
    }

    // Filtrar por tipo
    if (this.filtroTipo() !== 'TODOS') {
      evaluaciones = evaluaciones.filter((e) => e.tipo === this.filtroTipo());
    }

    // Filtrar por curso
    if (this.filtroCurso() !== 'TODOS') {
      evaluaciones = evaluaciones.filter((e) => e.curso.nombre === this.filtroCurso());
    }

    return evaluaciones.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  });

  ngOnInit() {
    this.evaluacionService.cargarEvaluaciones();
  }

  navegarACrear() {
    this.router.navigate(['/evaluaciones/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/evaluaciones', id]);
  }

  editarEvaluacion(id: number) {
    this.router.navigate(['/evaluaciones/editar', id]);
  }

  eliminarEvaluacion(id: number) {
    const evaluacion = this.evaluacionService.entities().find((e) => e.id === id);

    if (!evaluacion) return;

    if (confirm(`¿Estás seguro de eliminar la evaluación "${evaluacion.titulo}"?`)) {
      this.evaluacionService.eliminarEvaluacion(id).subscribe({
        error: (error) => {
          console.error('Error al eliminar evaluación:', error);
        },
      });
    }
  }

  // Métodos de utilidad
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  getTipoColor(tipo: string): string {
    switch (tipo) {
      case 'EXAMEN':
        return 'text-red-400 bg-red-900/20 border-red-700/50';
      case 'TRABAJO_PRACTICO':
        return 'text-blue-400 bg-blue-900/20 border-blue-700/50';
      case 'PROYECTO':
        return 'text-green-400 bg-green-900/20 border-green-700/50';
      case 'PARTICIPACION':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-700/50';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-700/50';
    }
  }

  getEstadoColor(activo: boolean): string {
    return activo
      ? 'text-green-400 bg-green-900/20 border-green-700/50'
      : 'text-red-400 bg-red-900/20 border-red-700/50';
  }

  limpiarFiltros() {
    this.filtroActivo.set(null);
    this.filtroTipo.set('TODOS');
    this.filtroCurso.set('TODOS');
  }
}
