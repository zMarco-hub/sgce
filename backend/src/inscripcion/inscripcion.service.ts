import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';

@Injectable()
export class InscripcionService {
  constructor(
    @InjectRepository(Inscripcion) private readonly insRepo: Repository<Inscripcion>,
    @InjectRepository(Estudiante) private readonly estRepo: Repository<Estudiante>,
    @InjectRepository(Curso) private readonly cursoRepo: Repository<Curso>,
  ) {}

  async create(dto: CreateInscripcionDto) {
    const estudiante = await this.estRepo.findOne({ where: { id: dto.estudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
    if (!curso) throw new NotFoundException('Curso no encontrado');
    if (!curso.activo) throw new BadRequestException('El curso no está activo');

    const dup = await this.insRepo.findOne({ where: { estudiante: { id: estudiante.id }, curso: { id: curso.id } } });
    if (dup) throw new BadRequestException('El estudiante ya está inscrito en este curso');

    const ins = this.insRepo.create({ estudiante, curso });
    return this.insRepo.save(ins);
  }

  findAll() {
    return this.insRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const ins = await this.insRepo.findOne({ where: { id } });
    if (!ins) throw new NotFoundException('Inscripción no encontrada');
    return ins;
  }

  
  async update(id: number, dto: UpdateInscripcionDto) {
    const ins = await this.findOne(id);

    if (dto.estudianteId) {
      const est = await this.estRepo.findOne({ where: { id: dto.estudianteId } });
      if (!est) throw new NotFoundException('Estudiante no encontrado');
      ins.estudiante = est;
    }
    if (dto.cursoId) {
      const curso = await this.cursoRepo.findOne({ where: { id: dto.cursoId } });
      if (!curso) throw new NotFoundException('Curso no encontrado');
      ins.curso = curso;
    }
    return this.insRepo.save(ins);
  }

  async remove(id: number) {
    const ins = await this.findOne(id);
    await this.insRepo.remove(ins);
    return { ok: true };
  }
}
