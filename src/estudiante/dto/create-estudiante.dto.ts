import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstudianteDto {
  @ApiProperty({ example: '2025-00123', description: 'Código único del estudiante' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  codigo: string;

  @ApiProperty({ example: 7, description: 'ID de usuario asociado (único)' })
  @Type(() => Number)
  @IsInt()
  usuarioId: number;
}
