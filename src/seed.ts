import { DataSource } from 'typeorm';
import { Rol, RolNombre } from './rol/entities/rol.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Docente } from './docente/entities/docente.entity';
import { Curso } from './curso/entities/curso.entity';
import { Inscripcion } from './inscripcion/entities/inscripcion.entity';
import { Evaluacion } from './evaluacion/entities/evaluacion.entity';
import { Nota } from './nota/entities/nota.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Rol,
    Usuario,
    Estudiante,
    Docente,
    Curso,
    Inscripcion,
    Evaluacion,
    Nota,
  ],
  synchronize: true,
});

async function run() {
  await ds.initialize();

  const rolRepo = ds.getRepository(Rol);
  const userRepo = ds.getRepository(Usuario);

  // Crear roles si no existen
  for (const nombre of [
    RolNombre.ADMIN,
    RolNombre.DOCENTE,
    RolNombre.ESTUDIANTE,
  ]) {
    const exists = await rolRepo.findOne({ where: { nombre } });
    if (!exists) await rolRepo.save(rolRepo.create({ nombre }));
  }

  // Crear usuario admin si no existe
  const adminEmail = 'admin@sgce.com';
  let admin = await userRepo.findOne({ where: { email: adminEmail } });

  if (!admin) {
    const adminRol = await rolRepo.findOne({
      where: { nombre: RolNombre.ADMIN },
    });
    admin = userRepo.create({
      nombre: 'Admin',
      apellido: 'SGCE',
      email: adminEmail,
      password_hash: await bcrypt.hash('Admin123!', 10),
      rol: adminRol!,
    });
    await userRepo.save(admin);
  }

  console.log('✅ Seed OK. Admin: admin@sgce.com / Admin123!');
  await ds.destroy();
}

run();
