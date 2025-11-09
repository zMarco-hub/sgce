import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'curso' })
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nombre: string;

  // Relación lógica: docente_id (evitamos ManyToOne por ahora)
  @Column({ name: 'docente_id' })
  docenteId: number;

  @Column({ length: 20 })
  gestion: string; // p.ej. "2025-1"

  @Column({ default: true })
  activo: boolean;
}