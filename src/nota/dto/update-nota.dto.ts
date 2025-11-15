// src/nota/dto/update-nota.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateNotaDto } from './create-nota.dto';
export class UpdateNotaDto extends PartialType(CreateNotaDto) {}
