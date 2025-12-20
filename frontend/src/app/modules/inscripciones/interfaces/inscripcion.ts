export interface Inscripcion {
  id: number;
  fecha: string;
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
  curso: {
    id: number;
    nombre: string;
    gestion: string;
    docente?: {
      id: number;
      titulo: string;
      usuario: {
        nombre: string;
        apellido: string;
      };
    };
  };
}

export interface CreateInscripcionDto {
  estudianteId: number;
  cursoId: number;
}
