import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotaService } from '../../services/nota';
import { Nota } from '../../interfaces/nota';

@Component({
  selector: 'app-nota-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nota-list.html',
})
export class NotaList implements OnInit {
  notaService = inject(NotaService);
  private router = inject(Router);

  // Filtros
  filtroTipo: string = 'TODAS';
  tiposFiltro = ['TODAS', 'APROBADAS', 'DESAPROBADAS', 'CURSO', 'ESTUDIANTE'];

  // Filtros específicos
  filtroCursoId: string = '';
  filtroEstudianteId: string = '';
  filtroEvaluacionId: string = '';

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 10;

  ngOnInit() {
    this.notaService.cargarNotas();
    // this.notaService.cargarPromediosCursos();
  }

  navegarACrear() {
    this.router.navigate(['/notas/crear']);
  }

  verDetalle(id: number) {
    this.router.navigate(['/notas', id]);
  }

  editarNota(id: number) {
    this.router.navigate(['/notas/editar', id]);
  }

  eliminarNota(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
      this.notaService
        .eliminarNota(id)
        .pipe(
          catchError((error) => {
            console.error('Error al eliminar nota:', error);
            return of(null);
          })
        )
        .subscribe(() => {
          this.notaService.cargarNotas();
          // this.notaService.cargarPromediosCursos();
        });
    }
  }

  // Filtrar notas
  get notasFiltradas() {
    let notas = this.notaService.entities();

    // Filtrar por tipo
    if (this.filtroTipo === 'APROBADAS') {
      notas = notas.filter((nota) => this.esAprobada(nota));
    } else if (this.filtroTipo === 'DESAPROBADAS') {
      notas = notas.filter((nota) => !this.esAprobada(nota));
    }

    // Filtrar por curso
    if (this.filtroCursoId) {
      notas = notas.filter((nota) => nota.evaluacion.curso.id === +this.filtroCursoId);
    }

    // Filtrar por estudiante
    if (this.filtroEstudianteId) {
      notas = notas.filter((nota) => nota.estudiante.id === +this.filtroEstudianteId);
    }

    // Filtrar por evaluación
    if (this.filtroEvaluacionId) {
      notas = notas.filter((nota) => nota.evaluacion.id === +this.filtroEvaluacionId);
    }

    return notas;
  }

  // Obtener notas paginadas
  get notasPaginadas() {
    const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.notasFiltradas.slice(startIndex, startIndex + this.itemsPorPagina);
  }

  // Calcular total de páginas
  get totalPaginas(): number {
    return Math.ceil(this.notasFiltradas.length / this.itemsPorPagina);
  }

  // Navegación de páginas
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // Determinar si una nota está aprobada
  esAprobada(nota: Nota): boolean {
    const porcentaje = (nota.valor / nota.evaluacion.nota_maxima) * 100;
    return porcentaje >= 60; // Aprobado con 60% o más
  }

  // Obtener color según el valor de la nota
  getNotaColor(nota: Nota): string {
    const porcentaje = (nota.valor / nota.evaluacion.nota_maxima) * 100;

    if (porcentaje >= 80) return 'bg-green-900/30 text-green-400';
    if (porcentaje >= 60) return 'bg-yellow-900/30 text-yellow-400';
    if (porcentaje >= 40) return 'bg-orange-900/30 text-orange-400';
    return 'bg-red-900/30 text-red-400';
  }

  // Obtener ícono según el valor de la nota
  getNotaIcon(nota: Nota): string {
    const porcentaje = (nota.valor / nota.evaluacion.nota_maxima) * 100;

    if (porcentaje >= 90) return '🏆';
    if (porcentaje >= 80) return '⭐';
    if (porcentaje >= 70) return '👍';
    if (porcentaje >= 60) return '✅';
    if (porcentaje >= 40) return '⚠️';
    return '❌';
  }

  // Formatear fecha
  formatearFecha(fechaStr: string): string {
    return new Date(fechaStr).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  // Calcular porcentaje de la nota
  calcularPorcentaje(nota: Nota): number {
    return (nota.valor / nota.evaluacion.nota_maxima) * 100;
  }

  // Limpiar filtros
  limpiarFiltros() {
    this.filtroTipo = 'TODAS';
    this.filtroCursoId = '';
    this.filtroEstudianteId = '';
    this.filtroEvaluacionId = '';
    this.paginaActual = 1;
  }

  // Exportar a CSV
  // exportarCSV() {
  //   this.notaService.obtenerReporteCSV(
  //     this.filtroCursoId ? +this.filtroCursoId : undefined,
  //     this.filtroEvaluacionId ? +this.filtroEvaluacionId : undefined
  //   ).subscribe({
  //     next: (blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = `notas_${new Date().toISOString().split('T')[0]}.csv`;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error: (error) => {
  //       console.error('Error al exportar CSV:', error);
  //     }
  //   });
  // }
}
