import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly repo: Repository<Estudiante>,
  ) {}

  async create(dto: CreateEstudianteDto) {
    try {
      const e = this.repo.create(dto);
      return await this.repo.save(e);
    } catch (err: any) {
      if (err.code === '23505') {
        // UNIQUE usuario_id o codigo
        throw new BadRequestException('usuarioId o código ya están registrados');
      }
      if (err.code === '23503') {
        // FK a usuario no existe
        throw new BadRequestException('usuario_id no existe');
      }
      throw err;
    }
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Estudiante no encontrado');
    return e;
  }

  async findByCodigo(codigo: string) {
    const e = await this.repo.findOne({ where: { codigo } });
    if (!e) throw new NotFoundException('Estudiante no encontrado');
    return e;
  }

  async update(id: number, dto: UpdateEstudianteDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    try {
      return await this.repo.save(e);
    } catch (err: any) {
      if (err.code === '23505') {
        throw new BadRequestException('usuarioId o código ya están registrados');
      }
      if (err.code === '23503') {
        throw new BadRequestException('usuario_id no existe');
      }
      throw err;
    }
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { deleted: true };
  }
}