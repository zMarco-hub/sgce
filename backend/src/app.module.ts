import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';
import { CursoModule } from './curso/curso.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { NotaModule } from './nota/nota.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    // ✅ Cargar variables del archivo .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace disponibles todas las variables
    }),

    // ✅ Configurar conexión con PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),

    RolModule,

    UsuarioModule,

    EstudianteModule,

    DocenteModule,

    CursoModule,

    InscripcionModule,

    EvaluacionModule,

    NotaModule,

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
