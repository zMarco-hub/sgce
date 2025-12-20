import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { CreateInscripcionDto } from '../../interfaces/inscripcion';
import { InscripcionService } from '../../services/inscripciones';

@Component({
  selector: 'app-inscripcion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscripcion-form.html',
})
export class InscripcionForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  inscripcionService = inject(InscripcionService);

  esEdicion = signal(false);
  inscripcionId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  inscripcionForm = this.fb.group({
    estudianteId: ['', [Validators.required, Validators.min(1)]],
    cursoId: ['', [Validators.required, Validators.min(1)]],
  });

  // Getters para controles
  get estudianteIdControl(): FormControl {
    return this.inscripcionForm.get('estudianteId') as FormControl;
  }

  get cursoIdControl(): FormControl {
    return this.inscripcionForm.get('cursoId') as FormControl;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.inscripcionId.set(+id);
        this.cargarInscripcion(+id);
      }
    }

    // Si es edición, deshabilitar los campos de estudiante y curso
    if (this.esEdicion()) {
      this.estudianteIdControl.disable();
      this.cursoIdControl.disable();
    }
  }

  cargarInscripcion(id: number) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.inscripcionService.obtenerInscripcionPorId(id).subscribe({
      next: (inscripcion) => {
        this.inscripcionForm.patchValue({
          estudianteId: inscripcion.estudiante.id.toString(),
          cursoId: inscripcion.curso.id.toString(),
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar inscripción:', error);
        this.errorMessage.set('Error al cargar los datos de la inscripción.');
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/inscripciones']), 3000);
      },
    });
  }

  onSubmit() {
    this.errorMessage.set(null);

    // Marcar todos los campos como tocados para mostrar errores
    this.inscripcionForm.markAllAsTouched();

    if (this.inscripcionForm.invalid) {
      this.errorMessage.set('Por favor, corrige los errores en el formulario.');
      return;
    }

    this.isLoading.set(true);
    const formValue = this.inscripcionForm.getRawValue();

    if (this.esEdicion() && this.inscripcionId()) {
      // En modo edición solo actualizamos los campos básicos (no hay estado ni nota)
      // O podrías redirigir o mostrar un mensaje de que no se puede editar
      this.errorMessage.set('Las inscripciones no se pueden editar una vez creadas.');
      this.isLoading.set(false);
      return;
    } else {
      const createData: CreateInscripcionDto = {
        estudianteId: +formValue.estudianteId!,
        cursoId: +formValue.cursoId!,
      };

      this.inscripcionService
        .crearInscripcion(createData)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/inscripciones']);
          },
          error: (error) => {
            console.error('Error al crear inscripción:', error);
            this.errorMessage.set(this.getErrorMessage(error));
          },
        });
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 409) {
      return 'El estudiante ya está inscrito en este curso.';
    }
    if (error.status === 404) {
      if (error.error?.message?.includes('estudiante')) {
        return 'El estudiante especificado no existe.';
      }
      if (error.error?.message?.includes('curso')) {
        return 'El curso especificado no existe.';
      }
      return 'Recurso no encontrado. Verifica los IDs ingresados.';
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
      this.inscripcionForm.dirty &&
      !confirm('¿Estás seguro de cancelar? Los cambios no guardados se perderán.')
    ) {
      return;
    }
    this.router.navigate(['/inscripciones']);
  }
}
