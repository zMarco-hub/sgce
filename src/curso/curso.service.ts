import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private repo: Repository<Curso>) {}

  async create(dto: CreateCursoDto) {
    try {
      const curso = this.repo.create(dto);
      return await this.repo.save(curso);
    } catch (e: any) {
      if (e.code === '23505') {
        // UNIQUE (nombre, gestion, docente_id) de tu SQL
        throw new BadRequestException('Ya existe un curso con ese nombre/gestión/docente');
      }
      throw e;
    }
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new NotFoundException('Curso no encontrado');
    return c;
  }

  async update(id: number, dto: UpdateCursoDto) {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    try {
      return await this.repo.save(c);
    } catch (e: any) {
      if (e.code === '23505') {
        throw new BadRequestException('Conflicto de UNIQUE en nombre/gestión/docente');
      }
      throw e;
    }
  }

  async remove(id: number) {
    const c = await this.findOne(id);
    await this.repo.remove(c);
    return { deleted: true };
  }
}