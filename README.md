# Sistema de Gestión de Cursos y Estudiantes

Este proyecto es un **Sistema de Gestión de Cursos y Estudiantes** implementado con un **backend** usando **NestJS**, **PostgreSQL** como base de datos, y **TypeORM** como ORM. El **frontend** está desarrollado con **Angular 21** y **TailwindCSS 4**. El sistema permite la gestión de cursos, estudiantes, inscripciones, y evaluaciones de manera eficiente.

# 🚀 Características del Proyecto

## Backend (NestJS)

- ✅ **Arquitectura modular y escalable**
- ✅ **API RESTful** con TypeScript
- ✅ **Autenticación JWT** con roles
- ✅ **Persistencia** con PostgreSQL y TypeORM
- ✅ **Documentación automática** con Swagger
- ✅ **Validación de datos** con `class-validator`
- ✅ **Manejo de errores global** en toda la aplicación
- ✅ **Seeds** para datos iniciales

## Frontend (Angular 21)

- ✅ **Aplicación SPA** con Angular
- ✅ **Gestión de estado** con Signals
- ✅ **Control Flow** con `@if` y `@for`
- ✅ **Diseño responsive** con Tailwind CSS 4
- ✅ **Tema oscuro** con acentos verdes
- ✅ **Autenticación y autorización**
- ✅ **CRUD completo** para todas las entidades

## Base de Datos (PostgreSQL)

- ✅ **Modelo relacional completo**
- ✅ **Migraciones** con TypeORM
- ✅ **Relaciones 1:1, 1:N y N:M**
- ✅ **Índices optimizados** para mejorar el rendimiento
- ✅ **Validación a nivel de base de datos** para integridad de datos

## Tecnologías

### Backend

| ![NestJS](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/NestJS-Dark.svg) | ![PostgreSQL](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/PostgreSQL-Dark.svg) | ![TypeORM](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/TypeORM-Dark.svg) |
| :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
|                                 [NestJS](https://nestjs.com/)                                  |                               [PostgreSQL](https://www.postgresql.org/)                                |                                  [TypeORM](https://typeorm.io/)                                  |

### Frontend

| ![Angular](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/Angular-Dark.svg) | ![Tailwind](https://cdn.jsdelivr.net/gh/tandpfun/skill-icons@main/icons/TypeScript.svg) |
| :----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |
|                                [Angular 21](https://angular.io/)                                 |                         [TailwindCSS](https://tailwindcss.com/)                         |

## Requisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js** (v22.x o superior) – [Instalar Node.js](https://nodejs.org/)
- **npm** (v10.x o superior) – [Instalar npm](https://www.npmjs.com/get-npm)
- **PostgreSQL** – [Instalar PostgreSQL](https://www.postgresql.org/download/)

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas:

```bash
├── backend/ # Backend implementado con NestJS
├── frontend/ # Frontend implementado con Angular
├── .env # Variables de entorno para el Backend
├── README.md # Este archivo
└── docker-compose.yml # Configuración para ejecutar el proyecto en contenedores Docker (opcional)
```

## Backend

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/zMarco-hub/sgce
cd sgce
```

### 2. Configuración del Backend

    Navega a la carpeta `backend/`:

```bash
 ## Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

```

### 2. Configuración

Asegúrate de tener configuradas las variables de entorno para la conexión a la base de datos PostgreSQL. Crea un archivo .env en la carpeta backend/ y agrega las siguientes variables:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nombre_de_tu_base_de_datos
DATABASE_USER=usuario
DATABASE_PASSWORD=contraseña
```

### 3.Ejecución

Inicia la aplicación en modo de desarrollo:

```bash
npm run start:dev
```

### Frontend

### 1. Instalación

Navega a la carpeta frontend/:

```bash
cd frontend
```

Instala las dependencias del proyecto:

```bash
npm install
```

### 2. Ejecución

Inicia la aplicación en modo de desarrollo:

```bash
npm start
# o
ng serve
```

El frontend estará disponible en

```bash
http://localhost:4200.
```

# 🗄️ Configuración de la Base de Datos

```bash
-- Conectarse a PostgreSQL
psql -U postgres

-- Crear base de datos
CREATE DATABASE sgce_db;
```

## 📚 Documentación API

Una vez que el backend esté ejecutándose, la documentación Swagger estará disponible en:

http://localhost:3000/api/docs

## Endpoints Principales

# Autenticación

```bash
POST   /api/auth/login          - Iniciar sesión
POST   /api/auth/register       - Registrar usuario (opcional)
```

# Usuarios

```bash
GET /api/v1/usuario - Listar usuarios (ADMIN)
GET /api/v1/usuario/:id - Obtener usuario por ID
POST /api/v1/usuario - Crear usuario (ADMIN)
PATCH /api/v1/usuario/:id - Actualizar usuario (ADMIN)
DELETE /api/v1/usuario/:id - Eliminar usuario (ADMIN)
```
