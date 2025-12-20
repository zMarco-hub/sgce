import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Docente } from '../../docente/entities/docente.entity';
import { Evaluacion } from '../../evaluacion/entities/evaluacion.entity';
@Entity('curso')
@Unique(['nombre', 'gestion', 'docente'])
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'varchar', length: 20 })
  gestion: string; // p.ej. "2025-1"

  @ManyToOne(() => Docente, d => d.id, { eager: true, nullable: false, onDelete: 'RESTRICT' })
  docente: Docente;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => Evaluacion, e => e.curso)
  evaluaciones: Evaluacion[];
}
