import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../rol/entities/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol) private readonly rolRepo: Repository<Rol>,
  ) {}

  create(dto: CreateRolDto) {
    const rol = this.rolRepo.create(dto as Rol);
    return this.rolRepo.save(rol);
  }

  findAll() {
    return this.rolRepo.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepo.findOne({ where: { id } });
    if (!rol) throw new NotFoundException('Rol no encontrado');
    return rol;
  }

  async update(id: number, dto: UpdateRolDto) {
    const rol = await this.findOne(id);
    Object.assign(rol, dto);
    return this.rolRepo.save(rol);
  }

 async remove(id: number) {
  const rol = await this.findOne(id);
  try {
    return await this.rolRepo.remove(rol);
  } catch (error) {
    if (error.code === '23503') {
      // Código 23503 = violación de clave foránea (foreign key)
      throw new BadRequestException('No se puede eliminar el rol porque está asignado a usuarios');
    }
    throw error;
  }
}
}
