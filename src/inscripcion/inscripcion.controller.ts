import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InscripcionService } from './inscripcion.service';
import { InscribirDto } from './dto/inscribir.dto';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionController {
  constructor(private readonly service: InscripcionService) {}

  @Post()
  inscribir(@Body() dto: InscribirDto) {
    return this.service.inscribir(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('curso/:cursoId')
  porCurso(@Param('cursoId', ParseIntPipe) cursoId: number) {
    return this.service.findByCurso(cursoId);
  }

  @Get('estudiante/:estudianteId')
  porEstudiante(@Param('estudianteId', ParseIntPipe) estudianteId: number) {
    return this.service.findByEstudiante(estudianteId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}