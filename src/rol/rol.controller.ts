import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rol')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() dto: CreateRolDto) {
    return this.rolService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRolDto) {
    return this.rolService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolService.remove(id);
  }
}
