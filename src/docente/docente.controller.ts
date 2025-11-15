import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Docente')
@ApiBearerAuth()
@Controller('docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear docente (ADMIN)' })
  @Roles('ADMIN')
  create(@Body() dto: CreateDocenteDto) {
    return this.docenteService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar docentes (ADMIN, DOCENTE)' })
  @Roles('ADMIN', 'DOCENTE')
  findAll() {
    return this.docenteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener docente por ID (ADMIN, DOCENTE)' })
  @Roles('ADMIN', 'DOCENTE')
  findOne(@Param('id') id: string) {
    return this.docenteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar docente (ADMIN)' })
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateDocenteDto) {
    return this.docenteService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar docente (ADMIN)' })
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.docenteService.remove(+id);
  }
}
