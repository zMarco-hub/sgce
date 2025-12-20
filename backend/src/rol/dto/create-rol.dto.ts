import { IsEnum } from 'class-validator';

export enum RolNombre {
  ADMIN = 'ADMIN',
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
}

export class CreateRolDto {
  @IsEnum(RolNombre, { message: 'nombre debe ser: ADMIN, DOCENTE o ESTUDIANTE' })
  nombre: RolNombre;
}