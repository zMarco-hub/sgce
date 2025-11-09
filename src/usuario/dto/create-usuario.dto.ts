import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RolNombre } from 'src/rol/entities/rol.entity';

export class CreateUsuarioDto {
  @IsString() @IsNotEmpty() nombre: string;
  @IsString() @IsNotEmpty() apellido: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsEnum(RolNombre) rol: RolNombre;
}
