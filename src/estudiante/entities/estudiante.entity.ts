import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Nota } from 'src/nota/entities/nota.entity';

@Entity('estudiante')
@Unique(['codigo'])
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @OneToOne(() => Usuario, u => u.estudiante, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

   @OneToMany(() => Nota, n => n.estudiante)
  notas: Nota[];
}
