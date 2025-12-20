// src/nota/nota.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Evaluacion } from '../evaluacion/entities/evaluacion.entity';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota) private readonly notaRepo: Repository<Nota>,
    @InjectRepository(Evaluacion) private readonly evalRepo: Repository<Evaluacion>,
    @InjectRepository(Estudiante) private readonly estRepo: Repository<Estudiante>,
  ) {}

  async create(dto: CreateNotaDto) {
    const evaluacion = await this.evalRepo.findOne({ where: { id: dto.evaluacionId } });
    if (!evaluacion) throw new NotFoundException('Evaluación no existe');
    const estudiante = await this.estRepo.findOne({ where: { id: dto.estudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no existe');

    const exists = await this.notaRepo.findOne({ where: { evaluacion, estudiante } });
    if (exists) throw new BadRequestException('Ya existe nota para este estudiante en esta evaluación');

    const nota = this.notaRepo.create({
      evaluacion, estudiante,
      nota: dto.nota, feedback: dto.feedback?.trim(),
    });
    return this.notaRepo.save(nota);
  }

  findAll() { return this.notaRepo.find(); }

  async findOne(id: number) {
    const n = await this.notaRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException('Nota no existe');
    return n;
  }

  async update(id: number, dto: UpdateNotaDto) {
    const n = await this.findOne(id);
    if (dto.evaluacionId) {
      const ev = await this.evalRepo.findOne({ where: { id: dto.evaluacionId } });
      if (!ev) throw new NotFoundException('Evaluación no existe');
      (n as any).evaluacion = ev;
    }
    if (dto.estudianteId) {
      const es = await this.estRepo.findOne({ where: { id: dto.estudianteId } });
      if (!es) throw new NotFoundException('Estudiante no existe');
      (n as any).estudiante = es;
    }
    Object.assign(n, { ...dto, feedback: dto.feedback?.trim() ?? n.feedback });
    return this.notaRepo.save(n);
  }

  async remove(id: number) {
    const n = await this.findOne(id);
    await this.notaRepo.remove(n);
    return { deleted: true };
  }

  // extras útiles
  async porEvaluacion(evaluacionId: number) {
    return this.notaRepo.find({ where: { evaluacion: { id: evaluacionId } as any } });
  }
  async porEstudiante(estudianteId: number) {
    return this.notaRepo.find({ where: { estudiante: { id: estudianteId } as any } });
  }
}
