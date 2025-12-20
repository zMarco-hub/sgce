import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum RolNombre {
  ADMIN = 'ADMIN',
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
}

@Entity({ name: 'rol' })
export class Rol {
  @ApiProperty({
    description: 'Identificador único del rol',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre del rol',
    enum: RolNombre,
    example: RolNombre.ADMIN,
  })
  @Column({
    type: 'enum',
    enum: RolNombre,
    unique: true,
  })
  nombre: RolNombre;

  @ApiProperty({
    description: 'Lista de usuarios asociados a este rol',
    type: () => [Usuario],
    required: false,
  })
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios?: Usuario[];
}

