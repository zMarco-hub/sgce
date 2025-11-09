import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

export enum RolNombre { ADMIN='ADMIN', DOCENTE='DOCENTE', ESTUDIANTE='ESTUDIANTE' }

@Entity()
export class Rol {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'enum', enum: RolNombre, unique: true })
  nombre: RolNombre;

  @OneToMany(() => Usuario, u => u.rol) usuarios: Usuario[];
}
