import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@ApiTags('notas')
@Controller('notas')
export class NotaController {
  constructor(private readonly service: NotaService) {}

  @Post()
  create(@Body() dto: CreateNotaDto) { return this.service.create(dto); }

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNotaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }

  // extras
  @Get('evaluacion/:evaluacionId')
  porEvaluacion(@Param('evaluacionId', ParseIntPipe) evaluacionId: number) {
    return this.service.porEvaluacion(evaluacionId);
  }

  @Get('promedio/curso/:cursoId')
  promedioCurso(@Param('cursoId', ParseIntPipe) cursoId: number) {
    return this.service.promedioCurso(cursoId);
  }
}