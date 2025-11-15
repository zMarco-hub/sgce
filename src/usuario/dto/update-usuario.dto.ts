import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';
import { RolNombre } from 'src/rol/entities/rol.entity';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiPropertyOptional({
    description: 'Nombre del usuario',
    maxLength: 50,
    example: 'Ana',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Si envías nombre, no puede estar vacío' })
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Apellido del usuario',
    maxLength: 50,
    example: 'Gómez',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Si envías apellido, no puede estar vacío' })
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  apellido?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico (único)',
    example: 'ana.gomez@sgce.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña en texto plano (se guardará hasheada)',
    minLength: 8,
    maxLength: 20,
    example: 'Ana123456',
  })
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'La contraseña no puede superar los 20 caracteres' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Rol del usuario',
    enum: RolNombre,
    enumName: 'RolNombre',
    example: RolNombre.DOCENTE,
  })
  @IsOptional()
  @IsEnum(RolNombre, {
    message: 'El rol debe ser uno de: ADMIN, DOCENTE o ESTUDIANTE',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  rol?: RolNombre;
}
