import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'inscripcion' })
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'estudiante_id' })
  estudianteId: number;

  @Column({ name: 'curso_id' })
  cursoId: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  fecha: Date;
}