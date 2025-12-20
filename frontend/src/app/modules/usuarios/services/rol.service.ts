import { Injectable, signal } from '@angular/core';

export interface RolOption {
  value: string;
  label: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class RolService {
  // Opciones de rol según tu API
  private rolesSignal = signal<RolOption[]>([
    {
      value: 'ADMIN',
      label: 'Administrador',
      description: 'Acceso completo al sistema',
    },
    {
      value: 'DOCENTE',
      label: 'Docente',
      description: 'Puede gestionar cursos y evaluaciones',
    },
    {
      value: 'ESTUDIANTE',
      label: 'Estudiante',
      description: 'Puede ver cursos y sus notas',
    },
  ]);

  readonly roles = this.rolesSignal.asReadonly();

  // Convertir rol string a label para mostrar
  getRolLabel(rolValue: string): string {
    const rol = this.roles().find((r) => r.value === rolValue);
    return rol ? rol.label : 'Desconocido';
  }

  // Convertir rol string a objeto completo (para formularios)
  getRolObject(rolValue: string): RolOption | undefined {
    return this.roles().find((r) => r.value === rolValue);
  }

  // Verificar si un rol existe
  isValidRol(rolValue: string): boolean {
    return this.roles().some((r) => r.value === rolValue);
  }
}
