// src/nota/entities/nota.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Evaluacion } from '../../evaluacion/entities/evaluacion.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';

@Entity()
@Unique(['evaluacion', 'estudiante'])
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evaluacion, e => e.notas, { eager: true, onDelete: 'CASCADE' })
  evaluacion: Evaluacion;

  @ManyToOne(() => Estudiante, e => e.notas, { eager: true, onDelete: 'CASCADE' })
  estudiante: Estudiante;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  nota: string; // "85.50"

  @Column({ type: 'text', nullable: true })
  feedback?: string;
}
