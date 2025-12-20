// src/evaluacion/entities/evaluacion.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';
import { Nota } from '../../nota/entities/nota.entity';

export enum EvaluacionTipo {
  EXAMEN   = 'EXAMEN',
  TAREA    = 'TAREA',
  PROYECTO = 'PROYECTO',
}

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Curso, c => c.evaluaciones, { eager: true, onDelete: 'CASCADE' })
  curso: Curso;

  @Column({ length: 120 })
  titulo: string;

  @Column({ type: 'enum', enum: EvaluacionTipo })
  tipo: EvaluacionTipo;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  ponderacion: string; // guarda "20.00", por ejemplo

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Nota, n => n.evaluacion)
  notas: Nota[];
}
