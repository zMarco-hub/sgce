import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { CreateEvaluacionDto, UpdateEvaluacionDto } from '../../interfaces/evaluacion';
import { EvaluacionService } from '../../services/evaluacion';

@Component({
  selector: 'app-evaluacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evaluacion-form.html',
})
export class EvaluacionForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  evaluacionService = inject(EvaluacionService);

  esEdicion = signal(false);
  evaluacionId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  evaluacionForm = this.fb.group({
    cursoId: ['', [Validators.required, Validators.min(1)]],
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    tipo: ['EXAMEN', [Validators.required]],
    fecha: ['', [Validators.required]],
    ponderacion: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    activo: [true],
  });

  // Getters para controles
  get cursoIdControl(): FormControl {
    return this.evaluacionForm.get('cursoId') as FormControl;
  }

  get tituloControl(): FormControl {
    return this.evaluacionForm.get('titulo') as FormControl;
  }

  get tipoControl(): FormControl {
    return this.evaluacionForm.get('tipo') as FormControl;
  }

  get fechaControl(): FormControl {
    return this.evaluacionForm.get('fecha') as FormControl;
  }

  get ponderacionControl(): FormControl {
    return this.evaluacionForm.get('ponderacion') as FormControl;
  }

  get activoControl(): FormControl {
    return this.evaluacionForm.get('activo') as FormControl;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.evaluacionId.set(+id);
        this.cargarEvaluacion(+id);
      }
    }

    // Establecer fecha mínima como hoy
    const hoy = new Date().toISOString().split('T')[0];
    this.fechaControl.setValue(hoy);
  }

  cargarEvaluacion(id: number) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.evaluacionService.obtenerEvaluacionPorId(id).subscribe({
      next: (evaluacion) => {
        this.evaluacionForm.patchValue({
          cursoId: evaluacion.curso.id.toString(),
          titulo: evaluacion.titulo,
          tipo: evaluacion.tipo,
          fecha: evaluacion.fecha.split('T')[0],
          ponderacion: evaluacion.ponderacion.toString(),
          activo: evaluacion.activo,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar evaluación:', error);
        this.errorMessage.set('Error al cargar los datos de la evaluación.');
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/evaluaciones']), 3000);
      },
    });
  }

  onSubmit() {
    this.errorMessage.set(null);
    this.evaluacionForm.markAllAsTouched();

    if (this.evaluacionForm.invalid) {
      this.errorMessage.set('Por favor, corrige los errores en el formulario.');
      return;
    }

    this.isLoading.set(true);
    const formValue = this.evaluacionForm.value;

    if (this.esEdicion() && this.evaluacionId()) {
      const updateData: UpdateEvaluacionDto = {
        titulo: formValue.titulo!,
        tipo: formValue.tipo! as any,
        fecha: formValue.fecha!,
        ponderacion: +formValue.ponderacion!,
        activo: formValue.activo ?? true,
      };

      this.evaluacionService
        .actualizarEvaluacion(this.evaluacionId()!, updateData)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/evaluaciones']);
          },
          error: (error) => {
            console.error('Error al actualizar evaluación:', error);
            this.errorMessage.set(this.getErrorMessage(error));
          },
        });
    } else {
      const createData: CreateEvaluacionDto = {
        cursoId: +formValue.cursoId!,
        titulo: formValue.titulo!,
        tipo: formValue.tipo! as any,
        fecha: formValue.fecha!,
        ponderacion: +formValue.ponderacion!,
        activo: formValue.activo ?? true,
      };

      this.evaluacionService
        .crearEvaluacion(createData)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/evaluaciones']);
          },
          error: (error) => {
            console.error('Error al crear evaluación:', error);
            this.errorMessage.set(this.getErrorMessage(error));
          },
        });
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 409) {
      return 'Ya existe una evaluación con ese título para este curso.';
    }
    if (error.status === 404) {
      if (error.error?.message?.includes('curso')) {
        return 'El curso especificado no existe.';
      }
      return 'Recurso no encontrado. Verifica los datos ingresados.';
    }
    if (error.status === 400) {
      return 'Datos inválidos. Por favor, verifica la información ingresada.';
    }
    if (error.status === 401 || error.status === 403) {
      return 'No tienes permisos para realizar esta acción.';
    }
    if (error.status === 0) {
      return 'Error de conexión. Verifica tu conexión a internet.';
    }
    return 'Ocurrió un error. Por favor, intenta nuevamente.';
  }

  cancelar() {
    if (
      this.evaluacionForm.dirty &&
      !confirm('¿Estás seguro de cancelar? Los cambios no guardados se perderán.')
    ) {
      return;
    }
    this.router.navigate(['/evaluaciones']);
  }

  // Método para obtener fecha mínima (hoy)
  getFechaMinima(): string {
    return new Date().toISOString().split('T')[0];
  }
}
