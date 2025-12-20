import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  templateUrl: './usuario-form.html',
  imports: [ReactiveFormsModule],
})
export class UsuarioFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  usuarioService = inject(UsuarioService);
  private router = inject(Router);

  idUsuario = this.route.snapshot.params['id']; // null si es creación

  // Mostrar/ocultar contraseña
  showPassword = signal(false);
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  // ¿Estamos editando?
  esEdicion = computed(() => !!this.idUsuario);

  // Roles disponibles
  roles = signal([
    { value: 'ADMINISTRADOR', label: 'Administrador', description: 'Acceso total' },
    { value: 'DOCENTE', label: 'Docente', description: 'Acceso parcial' },
    { value: 'ESTUDIANTE', label: 'Estudiante', description: 'Acceso básico' },
  ]);

  // Formulario reactivo
  usuarioForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.esEdicion() ? [] : [Validators.required, Validators.minLength(6)]],
    rol: ['', [Validators.required]],
    activo: [true],
  });

  // Error general
  formError = signal('');

  constructor() {
    if (this.esEdicion()) {
      this.cargarUsuario();
    }
  }

  // Cargar usuario existente para edición
  cargarUsuario() {
    this.usuarioService.obtenerUsuarioPorId(this.idUsuario).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          rol: usuario.rol as unknown as string, // el backend envía string: ADMINISTRADOR / DOCENTE / ESTUDIANTE
          activo: usuario.activo,
        });
      },
      error: () => this.formError.set('No se pudo cargar el usuario'),
    });
  }

  // Mostrar errores de campos
  getFieldError(field: string) {
    const control = this.usuarioForm.get(field);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'Campo obligatorio';
      if (control.errors?.['email']) return 'Correo inválido';
      if (control.errors?.['minlength']) return 'Debe tener mínimo 6 caracteres';
    }
    return null;
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

  // SUBMIT
  onSubmit() {
    if (this.usuarioForm.invalid) {
      this.formError.set('Completa correctamente el formulario');
      return;
    }

    this.formError.set('');
    const formValue = this.usuarioForm.value;

    // Datos base (siempre se envían)
    const payload: any = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      email: formValue.email,
      rol: formValue.rol,
      activo: formValue.activo,
    };

    // ⚠️ Solo enviar password si el usuario escribió algo
    if (formValue.password && formValue.password.trim() !== '') {
      payload.password = formValue.password;
    }

    if (this.esEdicion()) {
      this.usuarioService.actualizarUsuario(this.idUsuario, payload).subscribe({
        next: () => this.router.navigate(['/usuarios']),
        error: () => this.formError.set('No se pudo actualizar el usuario'),
      });
    } else {
      this.usuarioService.crearUsuario(payload).subscribe({
        next: () => this.router.navigate(['/usuarios']),
        error: () => this.formError.set('No se pudo crear el usuario'),
      });
    }
  }
}
