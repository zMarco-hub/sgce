export interface Nota {
  id: number;
  valor: number;
  fecha_registro: string; // ISO Date
  estudiante: {
    id: number;
    codigo: string;
    usuario: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
    };
  };
  evaluacion: {
    id: number;
    nombre: string;
    porcentaje: number;
    nota_maxima: number;
    curso: {
      id: number;
      codigo: string;
      nombre: string;
      ciclo: string;
    };
  };
  inscripcion: {
    id: number;
    estado: string;
  };
}

export interface CreateNotaDto {
  valor: number;
  estudianteId: number;
  evaluacionId: number;
  inscripcionId: number;
}

export interface UpdateNotaDto {
  valor?: number;
}

export interface NotaEstadisticas {
  promedio_curso: number;
  promedio_estudiante: number;
  nota_maxima: number;
  nota_minima: number;
  aprobados: number;
  desaprobados: number;
  total_estudiantes: number;
}

export interface NotaPromedioCurso {
  curso_id: number;
  curso_nombre: string;
  promedio: number;
  cantidad_evaluaciones: number;
}
