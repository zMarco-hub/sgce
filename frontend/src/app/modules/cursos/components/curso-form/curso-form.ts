import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UpdateCursoDto, CreateCursoDto } from '../../interfaces/curso';
import { CursoService } from '../../services/curso';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './curso-form.html',
})
export class CursoForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  cursoService = inject(CursoService);

  esEdicion = signal(false);
  cursoId = signal<number | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  cursoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    descripcion: ['', [Validators.maxLength(500)]],
    gestion: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/), this.validarGestion]],
    docenteId: ['', [Validators.required, Validators.min(1)]], // Cambiado a string y agregado min(1)
    activo: [true],
  });

  // Getter para fácil acceso a los controles
  get nombreControl(): FormControl {
    return this.cursoForm.get('nombre') as FormControl;
  }

  get gestionControl(): FormControl {
    return this.cursoForm.get('gestion') as FormControl;
  }

  get docenteIdControl(): FormControl {
    return this.cursoForm.get('docenteId') as FormControl;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.cursoId.set(+id);
        this.cargarCurso(+id);
      }
    }

    // Verificar si estamos en modo creación y resetear estado
    if (!this.esEdicion()) {
      this.cursoForm.reset({
        activo: true,
        docenteId: '', // Cambiado a string vacío
      });
    }
  }

  private validarGestion(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    // Validar formato año-año
    if (!/^\d{4}-\d{4}$/.test(value)) {
      return { pattern: true };
    }

    const [inicio, fin] = value.split('-').map(Number);

    // Validar que el segundo año sea mayor al primero
    if (fin <= inicio) {
      return { gestionInvalida: true };
    }

    // Validar que la diferencia sea 1 año (ej: 2024-2025)
    if (fin !== inicio + 1) {
      return { diferenciaInvalida: true };
    }

    // Validar que no sea un año futuro muy lejano
    const currentYear = new Date().getFullYear();
    if (inicio > currentYear + 5 || fin > currentYear + 6) {
      return { anioFuturo: true };
    }

    return null;
  }

  cargarCurso(id: number) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.cursoService.obtenerCursoPorId(id).subscribe({
      next: (curso) => {
        // Convertir docenteId a string para el input
        const docenteIdValue = curso.docente?.id ? curso.docente.id.toString() : '';

        this.cursoForm.patchValue({
          nombre: curso.nombre,
          descripcion: curso.descripcion || '',
          gestion: curso.gestion,
          docenteId: docenteIdValue, // Ahora es string
          activo: curso.activo,
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar curso:', error);
        this.errorMessage.set(
          'Error al cargar los datos del curso. Por favor, intenta nuevamente.'
        );
        this.isLoading.set(false);
        // Redirigir después de 3 segundos si hay error
        setTimeout(() => this.router.navigate(['/cursos']), 3000);
      },
    });
  }

  onSubmit() {
    // Limpiar mensajes de error previos
    this.errorMessage.set(null);

    // Marcar todos los campos como tocados para mostrar errores
    if (this.cursoForm.invalid) {
      Object.keys(this.cursoForm.controls).forEach((key) => {
        const control = this.cursoForm.get(key);
        control?.markAsTouched();
      });

      this.errorMessage.set('Por favor, corrige los errores en el formulario.');
      return;
    }

    this.isLoading.set(true);
    const formValue = this.cursoForm.value;

    // Validar que docenteId sea un número válido
    const docenteId = formValue.docenteId ? +formValue.docenteId : undefined;
    if (!docenteId || docenteId < 1) {
      this.errorMessage.set('El ID del docente debe ser un número mayor a 0.');
      this.isLoading.set(false);
      this.docenteIdControl.markAsTouched();
      return;
    }

    if (this.esEdicion() && this.cursoId()) {
      const updateData: UpdateCursoDto = {
        nombre: formValue.nombre!.trim(),
        descripcion: formValue.descripcion?.trim() || '',
        gestion: formValue.gestion!,
        docenteId: docenteId, // Ahora es número
        activo: formValue.activo ?? true,
      };

      this.cursoService.actualizarCurso(this.cursoId()!, updateData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/cursos']);
        },
        error: (error) => {
          console.error('Error al actualizar curso:', error);
          this.errorMessage.set(this.getErrorMessage(error));
          this.isLoading.set(false);
        },
      });
    } else {
      const createData: CreateCursoDto = {
        nombre: formValue.nombre!.trim(),
        descripcion: formValue.descripcion?.trim() || '',
        gestion: formValue.gestion!,
        docenteId: docenteId, // Ahora es número
        activo: formValue.activo ?? true,
      };

      this.cursoService.crearCurso(createData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/cursos']);
        },
        error: (error) => {
          console.error('Error al crear curso:', error);
          this.errorMessage.set(this.getErrorMessage(error));
          this.isLoading.set(false);
        },
      });
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 409) {
      return 'Ya existe un curso con ese nombre o código. Por favor, verifica los datos.';
    }
    if (error.status === 404) {
      return 'El docente especificado no existe. Verifica el ID.';
    }
    if (error.status === 400) {
      if (error.error?.message?.includes('docente')) {
        return 'El ID del docente es inválido. Verifica que el docente exista.';
      }
      return 'Datos inválidos. Por favor, verifica la información ingresada.';
    }
    if (error.status === 401 || error.status === 403) {
      return 'No tienes permisos para realizar esta acción.';
    }
    if (error.status === 0) {
      return 'Error de conexión. Por favor, verifica tu conexión a internet.';
    }
    return 'Ocurrió un error. Por favor, intenta nuevamente.';
  }

  // Método para validar formato de gestión en tiempo real
  onGestionInput(): void {
    const value = this.gestionControl.value;
    if (value && /^\d{4}$/.test(value.replace('-', ''))) {
      // Auto-formatear a año-año si el usuario ingresa 8 dígitos
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length === 8) {
        const formatted = `${cleanValue.substring(0, 4)}-${cleanValue.substring(4)}`;
        this.gestionControl.setValue(formatted, { emitEvent: false });
      }
    }
  }

  // Método para limpiar el ID del docente si es inválido
  onDocenteIdBlur(): void {
    const control = this.docenteIdControl;
    let value = control.value;

    // Si está vacío, dejarlo como string vacío
    if (value === '' || value === null || value === undefined) {
      return;
    }

    // Convertir a string y limpiar
    value = value.toString().trim();

    // Si es 0 o negativo, resetear a vacío
    if (value === '0' || parseInt(value) < 1) {
      control.setValue('');
      control.markAsTouched();
    } else {
      // Asegurar que sea un número válido
      control.setValue(value);
    }
  }

  // Método para manejar el input del docenteId
  onDocenteIdInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Solo permitir números
    const value = input.value.replace(/[^0-9]/g, '');
    this.docenteIdControl.setValue(value, { emitEvent: false });
  }

  cancelar() {
    if (
      this.cursoForm.dirty &&
      !confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')
    ) {
      return;
    }
    this.router.navigate(['/cursos']);
  }
}
