// src/evaluacion/evaluacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from '../curso/entities/curso.entity';
import { Evaluacion } from './entities/evaluacion.entity';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Curso])],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports: [TypeOrmModule],
})
export class EvaluacionModule {}
