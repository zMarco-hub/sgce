import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'estudiante' })
@Unique(['usuarioId'])
@Unique(['codigo'])
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Column({ length: 30 })
  codigo: string;
}