import { IsInt, IsPositive } from 'class-validator';

export class InscribirDto {
  @IsInt()
  @IsPositive()
  estudianteId: number;

  @IsInt()
  @IsPositive()
  cursoId: number;
}