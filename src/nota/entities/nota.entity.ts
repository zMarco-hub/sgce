import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'notas' })
@Unique(['evaluacionId', 'estudianteId'])
export class Nota {
  @PrimaryGeneratedColumn() id: number;

  @Column({ name: 'evaluacion_id' }) evaluacionId: number;

  @Column({ name: 'estudiante_id' }) estudianteId: number;

  @Column({ type: 'numeric', precision: 5, scale: 2 }) nota: string; // 0..100

  @Column({ type: 'text', nullable: true }) feedback?: string;
}