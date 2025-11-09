import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateNotaDto {
  @ApiProperty() @IsInt() evaluacionId: number;
  @ApiProperty() @IsInt() estudianteId: number;
  @ApiProperty({ example: 85 }) @IsNumber({ maxDecimalPlaces: 2 }) @Min(0) @Max(100)
  nota: number;
  @ApiPropertyOptional() @IsOptional() @IsString() feedback?: string;
}