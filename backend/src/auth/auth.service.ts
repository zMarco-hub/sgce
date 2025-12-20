
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from '../rol/entities/rol.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private users: Repository<Usuario>,
    @InjectRepository(Rol) private roles: Repository<Rol>,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const role = await this.roles.findOne({ where: { nombre: data.rol as any } });
    if (!role) throw new UnauthorizedException('Rol no válido');

    const password_hash = await bcrypt.hash(data.password, 10);
    const u = this.users.create({ 
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password_hash,
      rol: role
    } as any);

    const saved = await this.users.save(u);
    delete (saved as any).password_hash;
    return saved;
  }

  async validate(email: string, password: string) {
    const u = await this.users.findOne({ where: { email } });
    if (!u || !u.activo) throw new UnauthorizedException('Credenciales inválidas');
    const ok = await bcrypt.compare(password, u.password_hash);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');
    return u;
  }

  async login(email: string, password: string) {
    const u = await this.validate(email, password);
    const payload = { sub: u.id, email: u.email, rol: u.rol.nombre };
    return { access_token: this.jwt.sign(payload) };
  }
}
