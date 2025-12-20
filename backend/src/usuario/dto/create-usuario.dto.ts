import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RolNombre } from 'src/rol/entities/rol.entity';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    maxLength: 50,
    example: 'Ana',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    maxLength: 50,
    example: 'Gómez',
  })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @MaxLength(50, { message: 'El apellido no puede superar los 50 caracteres' })
  @Transform(({ value }) => value?.trim())
  apellido: string;

  @ApiProperty({
    description: 'Correo electrónico (único)',
    example: 'ana.gomez@sgce.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  email: string;

  @ApiProperty({
    description: 'Contraseña (se almacena hasheada)',
    minLength: 8,
    maxLength: 20,
    example: 'Ana123456',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(20, { message: 'La contraseña no puede superar los 20 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Rol del usuario',
    enum: RolNombre,
    enumName: 'RolNombre',
    example: RolNombre.DOCENTE,
  })
  @IsEnum(RolNombre, {
    message:
      'El rol debe ser uno de los siguientes valores: ADMIN, DOCENTE o ESTUDIANTE',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.toUpperCase() : value))
  rol: RolNombre;
}
