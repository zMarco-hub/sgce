import { PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
  @ApiPropertyOptional({ example: '2025-2' })
  @IsOptional() @IsString() @MaxLength(20)
  gestion?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean()
  activo?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional() @IsInt()
  docenteId?: number;
}
