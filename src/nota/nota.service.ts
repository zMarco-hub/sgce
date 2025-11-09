import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Injectable()
export class NotaService {
  constructor(@InjectRepository(Nota) private repo: Repository<Nota>) {}

  async create(dto: CreateNotaDto) {
    try {
      const n = this.repo.create(dto as any);
      return await this.repo.save(n);
    } catch (err: any) {
      if (err.code === '23505') throw new BadRequestException('Ya existe nota para esa evaluación y estudiante');
      if (err.code === '23503') throw new BadRequestException('evaluacion_id o estudiante_id no existen');
      throw err;
    }
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const n = await this.repo.findOne({ where: { id } });
    if (!n) throw new NotFoundException('Nota no encontrada');
    return n;
  }

  async update(id: number, dto: UpdateNotaDto) {
    const n = await this.findOne(id);
    Object.assign(n, dto);
    return this.repo.save(n);
  }

  async remove(id: number) {
    const n = await this.findOne(id);
    await this.repo.remove(n);
    return { deleted: true };
  }

  // extras
  porEvaluacion(evaluacionId: number) {
    return this.repo.find({ where: { evaluacionId } });
  }

  async promedioCurso(cursoId: number) {
    // promedio por estudiante dentro de un curso (simple)
    // nota: si necesitas ponderación, hay que JOIN con evaluacion. Aquí un ejemplo usando SQL crudo.
    return this.repo.query(
      `
      SELECT n.estudiante_id AS "estudianteId",
             ROUND(AVG(n.nota)::numeric, 2) AS promedio
      FROM notas n
      JOIN evaluacion e ON e.id = n.evaluacion_id
      WHERE e.curso_id = $1
      GROUP BY n.estudiante_id
      ORDER BY 2 DESC
      `,
      [cursoId],
    );
  }
}