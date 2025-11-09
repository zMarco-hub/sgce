import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Docente } from '../../docente/entities/docente.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn() id: number;

  @Column() nombre: string;
  @Column() apellido: string;
  @Column({ unique: true }) email: string;
  @Column() password_hash: string;

  @ManyToOne(() => Rol, r => r.usuarios, { eager: true })
  rol: Rol;

  @Column({ default: true }) activo: boolean;

  @OneToOne(() => Estudiante, e => e.usuarioId) estudiante?: Estudiante;
  @OneToOne(() => Docente, d => d.usuario) docente?: Docente;
}
