import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateEvaluacionDto {
  @ApiProperty({ example: 1 })
  @IsInt() cursoId: number;

  @ApiProperty({ example: 'Parcial 1' })
  @IsString() @Length(3, 120) titulo: string;

  @ApiProperty({ example: 'EXAMEN' })
  @IsString() @Length(3, 40) tipo: string;

  @ApiProperty({ example: '2025-05-10' })
  @IsDateString() fecha: string;

  @ApiProperty({ example: 30 })
  @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) @Max(100)
  ponderacion: number;
}