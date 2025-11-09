import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateEvaluacionDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() cursoId?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(3, 120) titulo?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(3, 40) tipo?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() fecha?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber({ maxDecimalPlaces: 2 }) @Min(0.01) @Max(100)
  ponderacion?: number;
}