import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { NotaService } from './nota.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { Nota } from './entities/nota.entity';

@ApiTags('nota') // Categoriza las rutas bajo 'nota' en Swagger
@ApiBearerAuth() // Requiere autenticación Bearer (JWT)
@Controller('notas') // Ruta base para el controlador
@UseGuards(JwtAuthGuard, RolesGuard) // Protege las rutas con los guards de autenticación y roles
export class NotaController {
  constructor(private readonly service: NotaService) {}

  @Post()
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden crear notas
  @ApiOperation({ summary: 'Crear una nueva nota' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Nota creada exitosamente', type: Nota }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Respuesta de error
  create(@Body() dto: CreateNotaDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden ver todas las notas
  @ApiOperation({ summary: 'Obtener todas las notas' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de notas', type: [Nota] }) // Respuesta con la lista de notas
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCENTE', 'ESTUDIANTE') // 'ADMIN', 'DOCENTE' y 'ESTUDIANTE' pueden ver una nota específica
  @ApiOperation({ summary: 'Obtener una nota por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Nota encontrada', type: Nota }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Nota no encontrada' }) // Respuesta de error si no se encuentra la nota
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden actualizar una nota
  @ApiOperation({ summary: 'Actualizar una nota existente' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Nota actualizada correctamente', type: Nota }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Nota no encontrada' }) // Respuesta de error si no se encuentra la nota
  update(@Param('id') id: number, @Body() dto: UpdateNotaDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN') // Solo 'ADMIN' puede eliminar una nota
  @ApiOperation({ summary: 'Eliminar una nota por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Nota eliminada correctamente' }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Nota no encontrada' }) // Respuesta de error si no se encuentra la nota
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }

  @Get('por-evaluacion/:evaluacionId')
  @Roles('ADMIN', 'DOCENTE') // Solo 'ADMIN' y 'DOCENTE' pueden obtener notas por evaluación
  @ApiOperation({ summary: 'Obtener notas por evaluación' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Notas encontradas', type: [Nota] }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Evaluación no encontrada' }) // Respuesta de error si no se encuentran notas para la evaluación
  porEvaluacion(@Param('evaluacionId') id: number) {
    return this.service.porEvaluacion(+id);
  }

  @Get('por-estudiante/:estudianteId')
  @Roles('ADMIN', 'DOCENTE', 'ESTUDIANTE') // 'ADMIN', 'DOCENTE' y 'ESTUDIANTE' pueden obtener notas por estudiante
  @ApiOperation({ summary: 'Obtener notas por estudiante' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Notas encontradas', type: [Nota] }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' }) // Respuesta de error si no se encuentran notas para el estudiante
  porEstudiante(@Param('estudianteId') id: number) {
    return this.service.porEstudiante(+id);
  }
}
