export interface Evaluacion {
  id: number;
  titulo: string;
  tipo: 'EXAMEN' | 'TRABAJO_PRACTICO' | 'PROYECTO' | 'PARTICIPACION' | 'OTRO';
  fecha: string;
  ponderacion: number; // Cambiado a number
  activo: boolean;
  curso: {
    id: number;
    nombre: string;
    gestion: string;
    activo: boolean;
    docente?: {
      id: number;
      titulo: string;
      usuario: {
        id: number;
        nombre: string;
        apellido: string;
        email: string;
        activo: boolean;
        rol: {
          id: number;
          nombre: string;
        };
      };
    };
  };
}

export interface CreateEvaluacionDto {
  cursoId: number;
  titulo: string;
  tipo: 'EXAMEN' | 'TRABAJO_PRACTICO' | 'PROYECTO' | 'PARTICIPACION' | 'OTRO';
  fecha: string;
  ponderacion: number;
  activo?: boolean;
}

export interface UpdateEvaluacionDto {
  titulo?: string;
  tipo?: 'EXAMEN' | 'TRABAJO_PRACTICO' | 'PROYECTO' | 'PARTICIPACION' | 'OTRO';
  fecha?: string;
  ponderacion?: number;
  activo?: boolean;
}
