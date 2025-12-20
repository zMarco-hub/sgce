import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateInscripcionDto {
  @ApiProperty({ example: 10, description: 'ID del estudiante' })
  @IsInt()
  estudianteId: number;

  @ApiProperty({ example: 3, description: 'ID del curso' })
  @IsInt()
  cursoId: number;
}
