import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Curso } from '../../curso/entities/curso.entity';

@Entity('inscripcion')
@Unique(['estudiante', 'curso'])
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Estudiante, e => e.id, { eager: true, nullable: false, onDelete: 'CASCADE' })
  estudiante: Estudiante;

  @ManyToOne(() => Curso, c => c.id, { eager: true, nullable: false, onDelete: 'CASCADE' })
  curso: Curso;

  @Column({ type: 'timestamp', default: () => 'now()' })
  fecha: Date;
}
