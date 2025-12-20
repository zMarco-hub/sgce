import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotaService } from '../../services/nota';
import { CreateNotaDto, UpdateNotaDto } from '../../interfaces/nota';

@Component({
  selector: 'app-nota-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-form.html',
})
export class NotaForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  notaService = inject(NotaService);

  esEdicion = signal(false);
  notaId = signal<number | null>(null);
  notaMaxima = signal<number>(20); // Valor por defecto

  notaForm = this.fb.group({
    valor: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    estudianteId: ['', [Validators.required, Validators.min(1)]],
    evaluacionId: ['', [Validators.required, Validators.min(1)]],
    inscripcionId: ['', [Validators.required, Validators.min(1)]],
    observaciones: ['', Validators.maxLength(500)],
  });

  // Sugerencias de notas comunes
  sugerenciasNotas = [10, 12, 14, 16, 18, 20];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.notaId.set(+id);
        this.cargarNota(+id);
      }
    }
  }

  cargarNota(id: number) {
    this.notaService
      .obtenerNotaPorId(id)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar nota:', error);
          return of(null);
        }),
        finalize(() => {
          // Aquí podrías cargar información adicional si es necesario
        })
      )
      .subscribe({
        next: (nota) => {
          if (nota) {
            this.notaForm.patchValue({
              valor: nota.valor,
              estudianteId: nota.estudiante.id.toString(),
              evaluacionId: nota.evaluacion.id.toString(),
              inscripcionId: nota.inscripcion.id.toString(),
              observaciones: '',
            });
            this.notaMaxima.set(nota.evaluacion.nota_maxima);
          }
        },
      });
  }

  onSubmit() {
    if (this.notaForm.valid) {
      const formValue = this.notaForm.value;
      const valor = formValue.valor!;

      // Validar que la nota no exceda el máximo (si tenemos el máximo)
      if (this.notaMaxima() && valor > this.notaMaxima()) {
        alert(`La nota no puede ser mayor a ${this.notaMaxima()}`);
        return;
      }

      if (this.esEdicion() && this.notaId()) {
        const updateData: UpdateNotaDto = {
          valor: valor,
        };

        this.notaService.actualizarNota(this.notaId()!, updateData).subscribe({
          next: () => {
            this.router.navigate(['/notas']);
          },
          error: (error) => {
            console.error('Error al actualizar nota:', error);
            alert('Error al actualizar la nota: ' + error.message);
          },
        });
      } else {
        const createData: CreateNotaDto = {
          valor: valor,
          estudianteId: +formValue.estudianteId!,
          evaluacionId: +formValue.evaluacionId!,
          inscripcionId: +formValue.inscripcionId!,
        };

        this.notaService.crearNota(createData).subscribe({
          next: () => {
            this.router.navigate(['/notas']);
          },
          error: (error) => {
            console.error('Error al crear nota:', error);
            alert('Error al crear la nota: ' + error.message);
          },
        });
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.notaForm.controls).forEach((key) => {
        const control = this.notaForm.get(key);
        control?.markAsTouched();
      });
      alert('Por favor, complete todos los campos requeridos correctamente.');
    }
  }

  cancelar() {
    this.router.navigate(['/notas']);
  }

  // Establecer nota desde sugerencias
  setNotaSugerida(nota: number) {
    this.notaForm.patchValue({ valor: nota });
  }

  // Calcular porcentaje basado en la nota máxima
  calcularPorcentaje(): number {
    const valor = this.notaForm.get('valor')?.value || 0;
    const max = this.notaMaxima();
    return max > 0 ? (valor / max) * 100 : 0;
  }

  // Obtener color según el porcentaje
  getColorPorcentaje(): string {
    const porcentaje = this.calcularPorcentaje();
    if (porcentaje >= 80) return 'text-green-400';
    if (porcentaje >= 60) return 'text-yellow-400';
    if (porcentaje >= 40) return 'text-orange-400';
    return 'text-red-400';
  }

  // Obtener emoji según el porcentaje
  getEmojiPorcentaje(): string {
    const porcentaje = this.calcularPorcentaje();
    if (porcentaje >= 90) return '🏆';
    if (porcentaje >= 80) return '⭐';
    if (porcentaje >= 70) return '👍';
    if (porcentaje >= 60) return '✅';
    if (porcentaje >= 40) return '⚠️';
    return '❌';
  }

  // Validar que todos los IDs sean válidos
  validarIDs(): boolean {
    const estudianteId = this.notaForm.get('estudianteId')?.value;
    const evaluacionId = this.notaForm.get('evaluacionId')?.value;
    const inscripcionId = this.notaForm.get('inscripcionId')?.value;

    return !!estudianteId && !!evaluacionId && !!inscripcionId;
  }
}
