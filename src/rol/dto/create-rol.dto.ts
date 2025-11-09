import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  nombre: string;
}
