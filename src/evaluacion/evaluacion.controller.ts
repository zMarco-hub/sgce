import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { Evaluacion } from './entities/evaluacion.entity';

@ApiTags('evaluacion') // Categoriza las rutas bajo 'evaluacion' en Swagger
@ApiBearerAuth() // Requiere autenticación Bearer (JWT)
@Controller('evaluaciones') // Ruta base para el controlador
@UseGuards(JwtAuthGuard, RolesGuard) // Protege las rutas con los guards de autenticación y roles
export class EvaluacionController {
  constructor(private readonly service: EvaluacionService) {}

  @Post()
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden crear evaluaciones
  @ApiOperation({ summary: 'Crear una nueva evaluación' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Evaluación creada exitosamente', type: Evaluacion }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Respuesta de error
  create(@Body() dto: CreateEvaluacionDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden ver todas las evaluaciones
  @ApiOperation({ summary: 'Obtener todas las evaluaciones' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de evaluaciones', type: [Evaluacion] }) // Respuesta con la lista de evaluaciones
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCENTE', 'ESTUDIANTE') // Los roles 'ADMIN', 'DOCENTE' y 'ESTUDIANTE' pueden ver una evaluación específica
  @ApiOperation({ summary: 'Obtener una evaluación por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Evaluación encontrada', type: Evaluacion }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' }) // Respuesta de error si no se encuentra la evaluación
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden actualizar una evaluación
  @ApiOperation({ summary: 'Actualizar una evaluación existente' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Evaluación actualizada correctamente', type: Evaluacion }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' }) // Respuesta de error si no se encuentra la evaluación
  update(@Param('id') id: number, @Body() dto: UpdateEvaluacionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN') // Solo los administradores pueden eliminar una evaluación
  @ApiOperation({ summary: 'Eliminar una evaluación por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Evaluación eliminada correctamente' }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' }) // Respuesta de error si no se encuentra la evaluación
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
