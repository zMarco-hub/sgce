import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn() id: number;

  @OneToOne(() => Usuario, u => u.docente, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn()
  usuario: Usuario;

  @Column({ nullable: true }) titulo: string;
}
