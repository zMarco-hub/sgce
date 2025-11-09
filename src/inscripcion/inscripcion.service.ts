import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { InscribirDto } from './dto/inscribir.dto';

@Injectable()
export class InscripcionService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly repo: Repository<Inscripcion>,
  ) {}

  async inscribir(dto: InscribirDto) {
    try {
      const nueva = this.repo.create(dto);
      return await this.repo.save(nueva);
    } catch (e: any) {
      if (e.code === '23505') throw new BadRequestException('Ya existe la inscripción');
      if (e.code === '23503') throw new NotFoundException('Curso o estudiante no existen');
      throw e;
    }
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  findByCurso(cursoId: number) {
    return this.repo.find({ where: { cursoId } });
  }

  findByEstudiante(estudianteId: number) {
    return this.repo.find({ where: { estudianteId } });
  }

  async remove(id: number) {
    const ins = await this.repo.findOne({ where: { id } });
    if (!ins) throw new NotFoundException('Inscripción no encontrada');
    await this.repo.remove(ins);
    return { deleted: true };
  }
}