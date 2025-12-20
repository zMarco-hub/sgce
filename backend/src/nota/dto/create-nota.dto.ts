// src/nota/dto/create-nota.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateNotaDto {
  @ApiProperty({ example: 5 })
  @IsInt() @IsPositive()
  evaluacionId: number;

  @ApiProperty({ example: 12 })
  @IsInt() @IsPositive()
  estudianteId: number;

  @ApiProperty({ example: '85.00', description: '0 <= nota <= 100' })
  @IsNumberString()
  nota: string;

  @ApiProperty({ required: false, maxLength: 500 })
  @IsString() @IsOptional() @MaxLength(500)
  feedback?: string;
}

