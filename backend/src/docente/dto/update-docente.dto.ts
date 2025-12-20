import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDocenteDto } from './create-docente.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {
  @ApiPropertyOptional({ example: 'M.Sc. Informática' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  titulo?: string;


  usuarioId?: never;
}
