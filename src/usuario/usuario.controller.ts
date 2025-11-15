import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';

@ApiTags('usuario') // Categoriza las rutas bajo 'usuario' en Swagger
@ApiBearerAuth() // Requiere autenticación Bearer (JWT)
@Controller('usuario')
@UseGuards(JwtAuthGuard, RolesGuard) // Protege las rutas con los guards
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Roles('ADMIN') // Solo los administradores pueden crear un usuario
  @ApiOperation({ summary: 'Crear un nuevo usuario' }) // Descripción breve de la operación
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente', type: Usuario }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Respuesta de error
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Roles('ADMIN') // Solo los administradores pueden ver todos los usuarios
  @ApiOperation({ summary: 'Obtener todos los usuarios' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [Usuario] }) // Respuesta con la lista de usuarios
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'DOCENTE') // Los administradores y docentes pueden ver un usuario específico
  @ApiOperation({ summary: 'Obtener un usuario por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' }) // Respuesta de error si no se encuentra el usuario
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN') // Solo los administradores pueden actualizar un usuario
  @ApiOperation({ summary: 'Actualizar un usuario existente' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente', type: Usuario }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' }) // Respuesta de error si no se encuentra el usuario
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles('ADMIN') // Solo los administradores pueden eliminar un usuario
  @ApiOperation({ summary: 'Eliminar un usuario por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' }) // Respuesta de error si no se encuentra el usuario
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
