import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Rol } from '../rol/entities/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
  ) {}

  // ✅ Crear usuario
  async create(dto: CreateUsuarioDto) {
    const existe = await this.usuarioRepo.findOne({
      where: { email: dto.email },
    });
    if (existe) throw new BadRequestException('El correo ya está registrado');

    const rol = await this.rolRepo.findOne({
      where: { nombre: dto.rol as any },
    });
    if (!rol) throw new BadRequestException('El rol especificado no existe');

    const password_hash = await bcrypt.hash(dto.password, 10);
    const usuario = this.usuarioRepo.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      password_hash,
      rol,
      activo: true,
    });

    return this.usuarioRepo.save(usuario);
  }

  // ✅ Listar todos los usuarios
  async findAll() {
    return this.usuarioRepo.find({ relations: ['rol'] });
  }

  // ✅ Buscar un usuario por ID
  async findOne(id: number) {
    const user = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['rol'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  // ✅ Actualizar usuario
  async update(id: number, dto: UpdateUsuarioDto) {
    const user = await this.findOne(id);

    if (dto.password) {
      dto['password_hash'] = await bcrypt.hash(dto.password, 10);
      delete dto.password;
    }

    if (dto.rol) {
      const rol = await this.rolRepo.findOne({
        where: { nombre: dto.rol as any },
      });
      if (!rol) throw new BadRequestException('El rol especificado no existe');
      user.rol = rol;
      delete (dto as any).rol; // 👈 agregar esto
    }

    Object.assign(user, dto);
    return this.usuarioRepo.save(user);
  }

  // ✅ Eliminar usuario
  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usuarioRepo.remove(user);
    return { message: 'Usuario eliminado correctamente' };
  }
}
