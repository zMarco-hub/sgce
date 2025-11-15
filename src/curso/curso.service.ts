import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Docente } from '../docente/entities/docente.entity';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso) private readonly cursoRepo: Repository<Curso>,
    @InjectRepository(Docente) private readonly docRepo: Repository<Docente>,
  ) {}

  async create(dto: CreateCursoDto) {
    const docente = await this.docRepo.findOne({ where: { id: dto.docenteId } });
    if (!docente) throw new NotFoundException('Docente no encontrado');

    const exists = await this.cursoRepo.findOne({
      where: { nombre: dto.nombre.trim(), gestion: dto.gestion.trim(), docente: { id: docente.id } },
      relations: { docente: true },
    });
    if (exists) throw new BadRequestException('Ya existe un curso con ese nombre, gestión y docente');

    const curso = this.cursoRepo.create({
      nombre: dto.nombre.trim(),
      gestion: dto.gestion.trim(),
      docente,
    });
    return this.cursoRepo.save(curso);
  }

  findAll() {
    return this.cursoRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const curso = await this.cursoRepo.findOne({ where: { id } });
    if (!curso) throw new NotFoundException('Curso no encontrado');
    return curso;
  }

  async update(id: number, dto: UpdateCursoDto) {
    const curso = await this.findOne(id);

    if (dto.docenteId) {
      const docente = await this.docRepo.findOne({ where: { id: dto.docenteId } });
      if (!docente) throw new NotFoundException('Docente no encontrado');
      curso.docente = docente;
    }
    if (dto.nombre !== undefined) curso.nombre = dto.nombre.trim();
    if (dto.gestion !== undefined) curso.gestion = dto.gestion.trim();
    if (dto.activo !== undefined) curso.activo = dto.activo;

    return this.cursoRepo.save(curso);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    await this.cursoRepo.remove(curso);
    return { ok: true };
  }
}

