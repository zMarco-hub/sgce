import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validaciones globales
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ✅ Prefijo global (todas las rutas iniciarán con /api/v1)
  app.setGlobalPrefix('api/v1');

  // ✅ Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('SGCE - Cursos y Estudiantes')
    .setDescription('API académica con Auth/JWT y roles')
    .setVersion('1.0')
    .addBearerAuth()
    .setExternalDoc(
      'Repositorio en GitHub', // Título que se verá en Swagger
      'https://github.com/zMarco-hub/sgce', // Enlace a tu repositorio
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  // ✅ Puerto desde .env o por defecto 3000
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
