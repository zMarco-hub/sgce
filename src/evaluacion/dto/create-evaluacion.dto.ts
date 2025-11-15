// src/evaluacion/dto/create-evaluacion.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, MaxLength } from 'class-validator';
import { EvaluacionTipo } from '../entities/evaluacion.entity';

export class CreateEvaluacionDto {
  @ApiProperty({ example: 3 })
  @IsInt() @IsPositive()
  cursoId: number;

  @ApiProperty({ example: 'Parcial 1' })
  @IsString() @IsNotEmpty() @MaxLength(120)
  titulo: string;

  @ApiProperty({ enum: EvaluacionTipo, example: EvaluacionTipo.EXAMEN })
  @IsEnum(EvaluacionTipo)
  tipo: EvaluacionTipo;

  @ApiProperty({ example: '2025-03-10' })
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: '20.00', description: '0 < p <= 100' })
  @IsNumberString()
  ponderacion: string;
}


