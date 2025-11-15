import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Rol } from './entities/rol.entity';

@ApiTags('rol') // Categoriza las rutas bajo 'rol' en Swagger
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo rol' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Rol creado exitosamente', type: Rol }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Respuesta de error
  create(@Body() dto: CreateRolDto) {
    return this.rolService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los roles' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Lista de roles', type: [Rol] }) // Respuesta exitosa
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un rol por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Rol encontrado', type: Rol }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Rol no encontrado' }) // Respuesta de error si no se encuentra el rol
  findOne(@Param('id') id: number) {
    return this.rolService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un rol existente' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Rol actualizado correctamente', type: Rol }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Rol no encontrado' }) // Respuesta de error si no se encuentra el rol
  update(@Param('id') id: number, @Body() dto: UpdateRolDto) {
    return this.rolService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol por su ID' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Rol eliminado correctamente' }) // Respuesta exitosa
  @ApiResponse({ status: 404, description: 'Rol no encontrado' }) // Respuesta de error si no se encuentra el rol
  remove(@Param('id') id: number) {
    return this.rolService.remove(id);
  }
}
