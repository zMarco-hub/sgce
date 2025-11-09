import { IsBoolean, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCursoDto {
  @IsOptional() @IsString() @Length(3, 120)
  nombre?: string;

  @IsOptional() @IsInt()
  docenteId?: number;

  @IsOptional() @IsString() @Length(3, 20)
  gestion?: string;

  @IsOptional() @IsBoolean()
  activo?: boolean;
}