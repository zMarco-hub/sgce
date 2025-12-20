import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateDocenteDto, CreateDocenteDto } from '../../interfaces/docente';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../../services/docente';

@Component({
  selector: 'app-docente-form',
  standalone: true, // Agregar standalone
  imports: [CommonModule, ReactiveFormsModule], // Agregar CommonModule
  templateUrl: './docente-form.html', // Agregar .component
})
export class DocenteForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  docenteService = inject(DocenteService);

  esEdicion = signal(false);
  docenteId = signal<number | null>(null);

  // El formulario debe coincidir con tus interfaces
  docenteForm = this.fb.group({
    usuarioId: ['', [Validators.required, Validators.min(1)]], // usuarioId es number
    titulo: ['', Validators.required], // Cambiar especialidad por titulo
    activo: [true],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.docenteId.set(+id);
        this.cargarDocente(+id);
      }
    }
  }

  cargarDocente(id: number) {
    this.docenteService.obtenerDocentePorId(id).subscribe({
      next: (docente) => {
        this.docenteForm.patchValue({
          usuarioId: docente.usuario.id.toString(), // Convertir a string para el input
          titulo: docente.titulo,
          activo: docente.activo,
        });
      },
      error: (error) => {
        console.error('Error al cargar docente:', error);
        // Opcional: redirigir o mostrar mensaje
      },
    });
  }

  onSubmit() {
    if (this.docenteForm.valid) {
      const formValue = this.docenteForm.value;

      if (this.esEdicion() && this.docenteId()) {
        const updateData: UpdateDocenteDto = {
          titulo: formValue.titulo!,
          activo: formValue.activo ?? true,
        };

        this.docenteService.actualizarDocente(this.docenteId()!, updateData).subscribe({
          next: () => {
            this.router.navigate(['/docentes']);
          },
          error: (error) => {
            console.error('Error al actualizar docente:', error);
          },
        });
      } else {
        const createData: CreateDocenteDto = {
          usuarioId: +formValue.usuarioId!,
          titulo: formValue.titulo!,
        };

        this.docenteService.crearDocente(createData).subscribe({
          next: () => {
            this.router.navigate(['/docentes']);
          },
          error: (error) => {
            console.error('Error al crear docente:', error);
          },
        });
      }
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.docenteForm.controls).forEach((key) => {
        const control = this.docenteForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancelar() {
    this.router.navigate(['/docentes']);
  }
}
