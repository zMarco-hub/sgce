import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(@InjectRepository(Evaluacion) private repo: Repository<Evaluacion>) {}

  async create(dto: CreateEvaluacionDto) {
    try {
      const e = this.repo.create(dto as any);
      return await this.repo.save(e);
    } catch (err: any) {
      if (err.code === '23503') throw new BadRequestException('curso_id no existe');
      throw err;
    }
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException('Evaluación no encontrada');
    return e;
  }

  async update(id: number, dto: UpdateEvaluacionDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { deleted: true };
  }

  // extras
  porCurso(cursoId: number) {
    return this.repo.find({ where: { cursoId }, order: { fecha: 'ASC' } });
  }
}