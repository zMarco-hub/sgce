import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante) private readonly estRepo: Repository<Estudiante>,
    @InjectRepository(Usuario) private readonly userRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateEstudianteDto) {
    const usuario = await this.userRepo.findOne({ where: { id: dto.usuarioId } });
    if (!usuario) throw new NotFoundException('El usuario especificado no existe');

    // asegurar que el usuario no esté ya asociado como estudiante
    const yaEst = await this.estRepo.findOne({ where: { usuario: { id: usuario.id } } });
    if (yaEst) throw new ConflictException('Ese usuario ya está asociado a un estudiante');

    // asegurar código único
    const codRepetido = await this.estRepo.findOne({ where: { codigo: dto.codigo } });
    if (codRepetido) throw new ConflictException('El código ya existe');

    const est = this.estRepo.create({ codigo: dto.codigo, usuario });
    return this.estRepo.save(est);
  }

  async findAll() {
    return this.estRepo.find(); // eager trae usuario
  }

  async findOne(id: number) {
    const est = await this.estRepo.findOne({ where: { id } });
    if (!est) throw new NotFoundException('Estudiante no encontrado');
    return est;
  }

  async update(id: number, dto: UpdateEstudianteDto) {
    const est = await this.findOne(id);

    if (dto.codigo && dto.codigo !== est.codigo) {
      const existe = await this.estRepo.findOne({ where: { codigo: dto.codigo } });
      if (existe) throw new ConflictException('El código ya está en uso');
      est.codigo = dto.codigo;
    }

    // No permitimos cambiar de usuario aquí
    if ((dto as any).usuarioId !== undefined) {
      throw new BadRequestException('No está permitido cambiar el usuario asociado');
    }

    return this.estRepo.save(est);
  }

  async remove(id: number) {
    const est = await this.findOne(id);
    await this.estRepo.remove(est);
    return { deleted: true };
  }
}

