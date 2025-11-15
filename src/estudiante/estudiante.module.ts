import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Usuario])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [TypeOrmModule],
})
export class EstudianteModule {}
