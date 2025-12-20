import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@test.com',
    description: 'Correo del usuario'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'clave123',
    description: 'Contraseña del usuario'
  })
  @IsString()
  @MinLength(6)
  password: string;
}
