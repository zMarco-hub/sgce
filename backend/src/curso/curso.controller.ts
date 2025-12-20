import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';

@ApiTags('curso') // Categoriza las rutas bajo 'curso'
@ApiBearerAuth() // Requiere autenticación Bearer (JWT)
@UseGuards(JwtAuthGuard, RolesGuard) // Protege las rutas con los guards
@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @Roles('ADMIN') // Solo el rol 'ADMIN' puede crear cursos
  @ApiOperation({ summary: 'Crear un nuevo curso' }) // Descripción breve
  @ApiResponse({ status: 201, description: 'Curso creado exitosamente', type: Curso }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Error por datos inválidos
  create(@Body() dto: CreateCursoDto) {
    return this.cursoService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'DOCENTE') // Solo los roles 'ADMIN' y 'DOCENTE' pueden ver los cursos
  @ApiOperation({ summary: 'Obtener todos los cursos' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de cursos', type: [Curso] }) // Respuesta con la lista de cursos
  async findAll() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCENTE') // Solo los roles 'ADMIN' y 'DOCENTE' pueden ver un curso específico
  @ApiOperation({ summary: 'Obtener un curso por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Curso encontrado', type: Curso }) // Respuesta exitosa con el curso encontrado
  @ApiResponse({ status: 404, description: 'Curso no encontrado' }) // Error si no se encuentra el curso
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN') // Solo el rol 'ADMIN' puede actualizar cursos
  @ApiOperation({ summary: 'Actualizar un curso existente' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Curso actualizado correctamente', type: Curso }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Curso no encontrado' }) // Error si no se encuentra el curso
  update(@Param('id') id: string, @Body() dto: UpdateCursoDto) {
    return this.cursoService.update(+id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN') // Solo el rol 'ADMIN' puede eliminar cursos
  @ApiOperation({ summary: 'Eliminar un curso por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Curso eliminado correctamente' }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Curso no encontrado' }) // Error si no se encuentra el curso
  remove(@Param('id') id: string) {
    return this.cursoService.remove(+id);
  }
}

