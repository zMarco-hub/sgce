import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Docente } from '../docente/entities/docente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Docente])],
  controllers: [CursoController],
  providers: [CursoService],
  exports: [TypeOrmModule],
})
export class CursoModule {}
