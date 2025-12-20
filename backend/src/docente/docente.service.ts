import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docente } from './entities/docente.entity';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente) private readonly docRepo: Repository<Docente>,
    @InjectRepository(Usuario) private readonly userRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateDocenteDto) {
    const usuario = await this.userRepo.findOne({ where: { id: dto.usuarioId } });
    if (!usuario) throw new NotFoundException('El usuario especificado no existe');

    // Un usuario sólo puede tener un registro de docente
    const yaDoc = await this.docRepo.findOne({ where: { usuario: { id: usuario.id } } });
    if (yaDoc) throw new ConflictException('Ese usuario ya está asociado a un docente');

    const docente = this.docRepo.create({ usuario, titulo: dto.titulo?.trim() || null });
    return this.docRepo.save(docente);
  }

  async findAll() {
    return this.docRepo.find(); // trae usuario por eager
  }

  async findOne(id: number) {
    const doc = await this.docRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Docente no encontrado');
    return doc;
  }

  async update(id: number, dto: UpdateDocenteDto) {
    const doc = await this.findOne(id);

    if ((dto as any).usuarioId !== undefined) {
      throw new BadRequestException('No está permitido cambiar el usuario asociado');
    }

    if (dto.titulo !== undefined) {
      doc.titulo = dto.titulo?.trim() || null;
    }

    return this.docRepo.save(doc);
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    await this.docRepo.remove(doc);
    return { deleted: true };
  }
}
