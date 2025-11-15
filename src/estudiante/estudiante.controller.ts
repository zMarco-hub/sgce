import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Estudiante')
@ApiBearerAuth()
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear estudiante (ADMIN)' })
  @Roles('ADMIN')
  create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar estudiantes (ADMIN, DOCENTE)' })
  @Roles('ADMIN', 'DOCENTE')
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID (ADMIN, DOCENTE, ESTUDIANTE -ver notas-)' })
  @Roles('ADMIN', 'DOCENTE')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estudiante (ADMIN)' })
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateEstudianteDto) {
    return this.estudianteService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante (ADMIN)' })
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
