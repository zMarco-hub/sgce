import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsEnum, IsOptional, MinLength, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { RolNombre } from 'src/rol/entities/rol.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password?: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(RolNombre, { message: 'El rol debe ser ADMIN, DOCENTE o ESTUDIANTE' })
  rol?: RolNombre;
}
