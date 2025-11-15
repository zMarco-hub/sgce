import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';
import { InscripcionService } from './inscripcion.service';
import { InscripcionController } from './inscripcion.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Estudiante, Curso])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
  exports: [TypeOrmModule],
})
export class InscripcionModule {}
