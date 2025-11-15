import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth') // Categoriza las rutas bajo 'auth' en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de un usuario' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Login exitoso', type: String }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Credenciales incorrectas' }) // Respuesta de error
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @Post('register')
  @ApiBearerAuth() // Requiere autenticación JWT
  @UseGuards(JwtAuthGuard) // Protege la ruta con el guard de autenticación JWT
  @Roles('ADMIN') // Solo el rol 'ADMIN' puede registrar nuevos usuarios
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción de la operación
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' }) // Respuesta exitosa
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta o datos inválidos' }) // Respuesta de error
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }
}
