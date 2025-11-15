// src/nota/nota.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Evaluacion } from '../evaluacion/entities/evaluacion.entity';
import { Nota } from './entities/nota.entity';
import { NotaController } from './nota.controller';
import { NotaService } from './nota.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, Evaluacion, Estudiante])],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
