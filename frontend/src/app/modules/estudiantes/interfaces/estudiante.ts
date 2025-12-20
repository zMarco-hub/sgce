export interface Estudiante {
  id: number;
  codigo: string;
  semestre: number;
  fecha_ingreso: string; // Date en string (ISO)
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

export interface CreateEstudianteDto {
  usuarioId: number;
  codigo: string;
  semestre?: number;
  fecha_ingreso?: string;
  activo?: boolean;
}

export interface UpdateEstudianteDto {
  codigo?: string;
  semestre?: number;
  fecha_ingreso?: string;
  activo?: boolean;
}
