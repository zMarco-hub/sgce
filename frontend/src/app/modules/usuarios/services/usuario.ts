import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../interfaces/usuario.interface';
import { Api } from '../../../core/services/api';
import { RolService } from './rol.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiService = inject(Api);
  private rolService = inject(RolService);

  // Señales para el estado
  private usuariosSignal = signal<Usuario[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computadas
  readonly usuarios = this.usuariosSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Métodos CRUD
  cargarUsuarios() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.apiService.get<Usuario[]>('usuarios').subscribe({
      next: (usuarios) => {
        this.usuariosSignal.set(usuarios);
        this.loadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set(this.getErrorMessage(error));
        this.loadingSignal.set(false);
        console.error('Error cargando usuarios:', error);
      },
    });
  }

  obtenerUsuarioPorId(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.apiService.get<Usuario>(`usuarios/${id}`).pipe(
      tap({
        next: () => this.loadingSignal.set(false),
        error: (error) => {
          this.errorSignal.set(this.getErrorMessage(error));
          this.loadingSignal.set(false);
          console.error(`Error obteniendo usuario ${id}:`, error);
        },
      })
    );
  }

  crearUsuario(usuarioData: CreateUsuarioDto) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    console.log('📤 Creando usuario con datos:', usuarioData);

    // Validar que el rol sea válido
    if (!this.rolService.isValidRol(usuarioData.rol)) {
      this.errorSignal.set('Rol inválido');
      this.loadingSignal.set(false);
      throw new Error('Rol inválido');
    }

    return this.apiService.post<Usuario>('usuarios', usuarioData).pipe(
      tap({
        next: (response) => {
          console.log('✅ Usuario creado exitosamente:', response);
          this.loadingSignal.set(false);

          // Actualizar la lista local
          const currentUsers = this.usuariosSignal();
          this.usuariosSignal.set([...currentUsers, response]);
        },
        error: (error) => {
          this.errorSignal.set(this.getErrorMessage(error));
          this.loadingSignal.set(false);
          console.error('❌ Error creando usuario:', error);

          // Debug detallado
          this.debugError(error, usuarioData);
        },
      })
    );
  }

  actualizarUsuario(id: number, usuarioData: UpdateUsuarioDto) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Si hay rol, validar que sea válido
    if (usuarioData.rol && !this.rolService.isValidRol(usuarioData.rol)) {
      this.errorSignal.set('Rol inválido');
      this.loadingSignal.set(false);
      throw new Error('Rol inválido');
    }

    return this.apiService.patch<Usuario>(`usuarios/${id}`, usuarioData).pipe(
      tap({
        next: (updatedUser) => {
          this.loadingSignal.set(false);

          // Actualizar en la lista local
          const currentUsers = this.usuariosSignal();
          const updatedUsers = currentUsers.map((user) => (user.id === id ? updatedUser : user));
          this.usuariosSignal.set(updatedUsers);
        },
        error: (error) => {
          this.errorSignal.set(this.getErrorMessage(error));
          this.loadingSignal.set(false);
          console.error(`Error actualizando usuario ${id}:`, error);
        },
      })
    );
  }

  eliminarUsuario(id: number) {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.apiService.delete(`usuarios/${id}`).pipe(
      tap({
        next: () => {
          this.loadingSignal.set(false);

          // Remover de la lista local
          const currentUsers = this.usuariosSignal();
          const filteredUsers = currentUsers.filter((user) => user.id !== id);
          this.usuariosSignal.set(filteredUsers);
        },
        error: (error) => {
          this.errorSignal.set(this.getErrorMessage(error));
          this.loadingSignal.set(false);
          console.error(`Error eliminando usuario ${id}:`, error);
        },
      })
    );
  }

  // Helper para mensajes de error
  private getErrorMessage(error: any): string {
    console.log('Error detallado:', error);

    if (error.error) {
      // Si el backend devuelve un mensaje específico
      if (error.error.message) {
        return error.error.message;
      }

      // Si hay errores de validación
      if (error.error.errors) {
        const errors = error.error.errors;
        if (Array.isArray(errors)) {
          return errors.map((err: any) => err.message || err).join(', ');
        } else if (typeof errors === 'object') {
          return Object.values(errors).flat().join(', ');
        }
      }

      // Si es texto plano
      if (typeof error.error === 'string') {
        try {
          const parsed = JSON.parse(error.error);
          return parsed.message || error.error;
        } catch {
          return error.error;
        }
      }
    }

    // Mensajes por status
    if (error.status === 400) {
      return 'Datos inválidos. Verifique la información.';
    } else if (error.status === 401) {
      return 'No autorizado. Por favor, inicie sesión.';
    } else if (error.status === 409) {
      return 'El correo electrónico ya está registrado.';
    } else if (error.status === 404) {
      return 'Recurso no encontrado.';
    } else if (error.status === 0) {
      return 'Error de conexión. Verifique su internet.';
    } else {
      return 'Error en el servidor. Intente nuevamente.';
    }
  }

  // Debug de errores
  private debugError(error: any, data: any) {
    console.log('=== DEBUG ERROR ===');
    console.log('Datos enviados:', JSON.stringify(data, null, 2));
    console.log('Status:', error.status);
    console.log('Status Text:', error.statusText);
    console.log('URL:', error.url);

    if (error.error) {
      console.log('Error response:', error.error);
    }
  }

  limpiarError() {
    this.errorSignal.set(null);
  }
}
