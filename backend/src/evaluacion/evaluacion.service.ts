// src/evaluacion/evaluacion.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from '../curso/entities/curso.entity';

import { Evaluacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion) private readonly evalRepo: Repository<Evaluacion>,
    @InjectRepository(Curso) private readonly cursoRepo: Repository<Curso>,
  ) {}

  async create(dto: CreateEvaluacionDto) {
    const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
    if (!curso) throw new NotFoundException('Curso no existe');

    const ev = this.evalRepo.create({
      curso,
      titulo: dto.titulo.trim(),
      tipo: dto.tipo,
      fecha: dto.fecha,
      ponderacion: dto.ponderacion,
    });
    return this.evalRepo.save(ev);
  }

  findAll() {
    return this.evalRepo.find();
  }

  async findOne(id: number) {
    const ev = await this.evalRepo.findOne({ where: { id } });
    if (!ev) throw new NotFoundException('Evaluación no existe');
    return ev;
  }

  async update(id: number, dto: UpdateEvaluacionDto) {
    const ev = await this.findOne(id);
    if (dto.cursoId) {
      const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
      if (!curso) throw new NotFoundException('Curso no existe');
      (ev as any).curso = curso;
    }
    Object.assign(ev, { ...dto, titulo: dto.titulo?.trim() ?? ev.titulo });
    return this.evalRepo.save(ev);
  }

  async remove(id: number) {
    const ev = await this.findOne(id);
    await this.evalRepo.remove(ev);
    return { deleted: true };
  }
}
