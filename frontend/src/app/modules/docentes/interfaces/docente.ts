export interface Docente {
  id: number;
  titulo: string;
  activo: boolean;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: {
      id: number;
      nombre: string;
    };
  };
}

export interface CreateDocenteDto {
  usuarioId: number;
  titulo?: string;
  activo?: boolean;
}

export interface UpdateDocenteDto {
  titulo?: string;
  activo?: boolean;
}
