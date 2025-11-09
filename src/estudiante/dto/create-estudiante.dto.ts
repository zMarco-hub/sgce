import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateEstudianteDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: '2025001' })
  @IsString()
  @Length(3, 30)
  codigo: string;
}