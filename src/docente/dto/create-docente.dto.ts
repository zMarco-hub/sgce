import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDocenteDto {
  @ApiProperty({ example: 5, description: 'ID del usuario asociado (único)' })
  @Type(() => Number)
  @IsInt()
  usuarioId: number;

  @ApiPropertyOptional({ example: 'Ing. de Sistemas', description: 'Título académico (opcional)' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  titulo?: string;
}
