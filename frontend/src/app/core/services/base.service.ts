import { inject, Injectable, signal } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { Api } from './api';

interface Entity {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends Entity> {
  private apiService = inject(Api);

  // Señales para manejar el estado de las entidades
  private entitiesSignal = signal<T[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computadas (expuestas solo para lectura)
  readonly entities = this.entitiesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Método para cargar las entidades
  cargarEntidades(endpoint: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.apiService
      .get<T[]>(endpoint)
      .pipe(finalize(() => this.loadingSignal.set(false)))
      .subscribe({
        next: (entities) => {
          this.entitiesSignal.set(entities);
        },
        error: (error) => {
          this.errorSignal.set(`Error al cargar ${endpoint}: ${error.message}`);
          console.error('Error:', error);
        },
      });
  }

  // Método para obtener una entidad por ID
  obtenerEntidadPorId(endpoint: string, id: number): Observable<T> {
    return this.apiService.get<T>(`${endpoint}/${id}`);
  }

  // Método para crear una nueva entidad
  crearEntidad(endpoint: string, entityData: T): Observable<T> {
    return this.apiService.post<T>(endpoint, entityData);
  }

  // Método para actualizar una entidad existente
  actualizarEntidad(endpoint: string, id: number, entityData: T): Observable<T> {
    return this.apiService.patch<T>(`${endpoint}/${id}`, entityData);
  }

  // Método para eliminar una entidad por ID
  eliminarEntidad(endpoint: string, id: number): Observable<void> {
    return this.apiService.delete(`${endpoint}/${id}`);
  }

  // Método para limpiar el error
  limpiarError(): void {
    this.errorSignal.set(null);
  }
}
