import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCursoDto {
  @IsString() @Length(3, 120)
  nombre: string;

  @IsInt()
  docenteId: number;

  @IsString() @Length(3, 20)
  gestion: string; // "2025-1"
}