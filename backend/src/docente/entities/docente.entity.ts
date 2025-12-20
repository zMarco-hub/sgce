import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('docente')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  titulo: string | null;

  @OneToOne(() => Usuario, u => u.docente, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
