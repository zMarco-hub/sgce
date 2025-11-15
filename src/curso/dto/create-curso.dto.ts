import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCursoDto {
  @ApiProperty({ example: 'Base de Datos I' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @ApiProperty({ example: '2025-1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  gestion: string;

  @ApiProperty({ example: 1, description: 'ID del docente responsable' })
  @IsInt()
  docenteId: number;
}
