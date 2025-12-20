import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateEstudianteDto, CreateEstudianteDto } from '../../interfaces/estudiante';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../services/estudiante';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiante-form.html',
})
export class EstudianteForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  estudianteService = inject(EstudianteService);

  esEdicion = signal(false);
  estudianteId = signal<number | null>(null);

  estudianteForm = this.fb.group({
    usuarioId: ['', [Validators.required, Validators.min(1)]],
    codigo: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const isEditRoute = this.route.snapshot.url.some(
        (segment) => segment.path === 'editar' || this.router.url.includes('/editar/')
      );

      if (isEditRoute) {
        this.esEdicion.set(true);
        this.estudianteId.set(+id);
        this.cargarEstudiante(+id);
      }
    }
  }

  cargarEstudiante(id: number) {
    this.estudianteService.obtenerEstudiantePorId(id).subscribe({
      next: (estudiante) => {
        this.estudianteForm.patchValue({
          usuarioId: estudiante.usuario.id.toString(),
          codigo: estudiante.codigo,
        });
      },
      error: (error) => {
        console.error('Error al cargar estudiante:', error);
      },
    });
  }

  onSubmit() {
    if (this.estudianteForm.valid) {
      const formValue = this.estudianteForm.value;

      if (this.esEdicion() && this.estudianteId()) {
        const updateData: UpdateEstudianteDto = {
          codigo: formValue.codigo!,
        };

        this.estudianteService.actualizarEstudiante(this.estudianteId()!, updateData).subscribe({
          next: () => {
            this.router.navigate(['/estudiantes']);
          },
          error: (error) => {
            console.error('Error al actualizar estudiante:', error);
          },
        });
      } else {
        const createData: CreateEstudianteDto = {
          usuarioId: +formValue.usuarioId!,
          codigo: formValue.codigo!,
        };

        this.estudianteService.crearEstudiante(createData).subscribe({
          next: () => {
            this.router.navigate(['/estudiantes']);
          },
          error: (error) => {
            console.error('Error al crear estudiante:', error);
          },
        });
      }
    } else {
      Object.keys(this.estudianteForm.controls).forEach((key) => {
        const control = this.estudianteForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancelar() {
    this.router.navigate(['/estudiantes']);
  }
}
