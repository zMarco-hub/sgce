import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'evaluacion' })
export class Evaluacion {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'curso_id' }) cursoId: number;

  @Column({ length: 120 }) titulo: string;

  @Column({ length: 40 }) tipo: string; // EXAMEN | TAREA | PROYECTO...

  @Column({ type: 'date' }) fecha: string; // YYYY-MM-DD

  @Column({ type: 'numeric', precision: 5, scale: 2 }) ponderacion: string; // 0..100
}