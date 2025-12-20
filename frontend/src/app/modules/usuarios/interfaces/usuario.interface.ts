export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password_hash: string;
  rol: Rol;
  activo: boolean;
  estudiante?: any;
  docente?: any;
}

export interface CreateUsuarioDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE';
  activo: boolean;
}

export interface UpdateUsuarioDto {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string; // opcional en edición
  rol?: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE';
  activo?: boolean;
}
