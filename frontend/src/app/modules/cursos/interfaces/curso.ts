export interface Curso {
  id: number;

  nombre: string;
  descripcion: string;
  gestion: string;

  activo: boolean;
  docente?: {
    id: number;
    usuario: {
      nombre: string;
      apellido: string;
    };
  };
}

export interface CreateCursoDto {
  nombre: string;
  descripcion?: string;
  gestion: string;
  docenteId?: number;
  activo?: boolean;
}

export interface UpdateCursoDto {
  nombre?: string;
  descripcion?: string;
  gestion: string;
  docenteId?: number;
  activo?: boolean;
}
