import { PartialType } from '@nestjs/swagger';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @ApiPropertyOptional({ example: '2025-00999', description: 'Nuevo código (opcional)' })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  codigo?: string;

  // Nota: normalmente NO se permite cambiar el usuario_id en update.
  usuarioId?: never;
}
