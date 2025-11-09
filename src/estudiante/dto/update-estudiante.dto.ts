import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEstudianteDto {
  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @ApiPropertyOptional({ example: '2025002' })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  codigo?: string;
}