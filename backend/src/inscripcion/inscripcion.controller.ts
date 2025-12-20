import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { Inscripcion } from './entities/inscripcion.entity';

@ApiTags('inscripcion') // Agregar el nombre del grupo de rutas en Swagger
@ApiBearerAuth() // Indica que la API usa autenticación Bearer (JWT)
@UseGuards(JwtAuthGuard, RolesGuard) // Protege las rutas con los guards
@Controller('inscripciones')
export class InscripcionController {
  constructor(private readonly insService: InscripcionService) {}

  @Post()
  @Roles('ADMIN', 'DOCENTE') // Roles permitidos para esta ruta
  @ApiOperation({ summary: 'Crear una nueva inscripción' }) // Descripción breve de la operación
  @ApiResponse({ status: 201, description: 'Inscripción creada correctamente', type: Inscripcion })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' })
  create(@Body() dto: CreateInscripcionDto) {
    return this.insService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'DOCENTE')
  @ApiOperation({ summary: 'Obtener todas las inscripciones' })
  @ApiResponse({ status: 200, description: 'Lista de inscripciones', type: [Inscripcion] })
  async findAll() {
    return this.insService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCENTE')
  @ApiOperation({ summary: 'Obtener una inscripción por su ID' })
  @ApiResponse({ status: 200, description: 'Inscripción encontrada', type: Inscripcion })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  findOne(@Param('id') id: string) {
    return this.insService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'DOCENTE')
  @ApiOperation({ summary: 'Actualizar los datos de una inscripción existente' })
  @ApiResponse({ status: 200, description: 'Inscripción actualizada correctamente', type: Inscripcion })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateInscripcionDto) {
    return this.insService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'DOCENTE')
  @ApiOperation({ summary: 'Eliminar una inscripción por su ID' })
  @ApiResponse({ status: 200, description: 'Inscripción eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  remove(@Param('id') id: string) {
    return this.insService.remove(+id);
  }
}
