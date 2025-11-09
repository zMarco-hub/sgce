import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@ApiTags('evaluaciones')
@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly service: EvaluacionService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Evaluación creada' })
  create(@Body() dto: CreateEvaluacionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de evaluaciones' })
  findAll() { return this.service.findAll(); }

  @Get('curso/:cursoId')
  porCurso(@Param('cursoId', ParseIntPipe) cursoId: number) {
    return this.service.porCurso(cursoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEvaluacionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}