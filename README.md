# Sistema de Gestión de Cursos y Estudiantes

Este proyecto es un **Sistema de Gestión de Cursos y Estudiantes** implementado con un **backend** usando **NestJS**, **PostgreSQL** como base de datos, y **TypeORM** como ORM. El **frontend** está desarrollado con **Angular 21** y **TailwindCSS 4**. El sistema permite la gestión de cursos, estudiantes, inscripciones, y evaluaciones de manera eficiente.

## Características

- **Backend**:
  - Desarrollado con **NestJS** (TypeScript).
  - Persistencia de datos con **PostgreSQL** y **TypeORM**.
  - Documentación de la API generada automáticamente con **Swagger**.
- **Frontend**:
  - Desarrollado con **Angular 21** (TypeScript).
  - Estilo visual usando **TailwindCSS 4**.

## Tecnologías

### Backend

| ![NestJS](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/NestJS-Dark.svg) | ![PostgreSQL](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/PostgreSQL-Dark.svg) | ![TypeORM](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/TypeORM-Dark.svg) |
| :--------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: |
|                                 [NestJS](https://nestjs.com/)                                  |                               [PostgreSQL](https://www.postgresql.org/)                                |                                  [TypeORM](https://typeorm.io/)                                  |

### Frontend

| ![Angular](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/Angular-Dark.svg) | ![Tailwind](https://raw.githubusercontent.com/tandpfun/skill-icons/master/icons/TailwindCSS-Dark.svg) |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
|                                [Angular 21](https://angular.io/)                                 |                                [TailwindCSS](https://tailwindcss.com/)                                |

## Requisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- **Node.js** (v14.x o superior) – [Instalar Node.js](https://nodejs.org/)
- **npm** (v6.x o superior) o **yarn** – [Instalar npm](https://www.npmjs.com/get-npm)
- **PostgreSQL** – [Instalar PostgreSQL](https://www.postgresql.org/download/)

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas:

├── backend/ # Backend implementado con NestJS
├── frontend/ # Frontend implementado con Angular
├── .env # Variables de entorno para el Backend
├── README.md # Este archivo
└── docker-compose.yml # Configuración para ejecutar el proyecto en contenedores Docker (opcional)

## Backend

### 1. Instalación

1. Navega a la carpeta `backend/`:

   ```bash
   cd backend
   npm install
   ```

### 2. Configuración

Asegúrate de tener configuradas las variables de entorno para la conexión a la base de datos PostgreSQL. Crea un archivo .env en la carpeta backend/ y agrega las siguientes variables:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=nombre_de_tu_base_de_datos
DATABASE_USER=usuario
DATABASE_PASSWORD=contraseña

### 3.Ejecución

Inicia la aplicación en modo de desarrollo:

npm run start:dev

La API estará disponible en http://localhost:3000

### 4.Documentación de la API con Swagger

La documentación de la API se genera automáticamente con Swagger. Para acceder a ella, abre tu navegador y ve a:

http://localhost:3000/api/docs

Allí podrás ver todos los endpoints disponibles y cómo interactuar con ellos.

## Frontend

### 1. Instalación

Navega a la carpeta frontend/:

cd frontend

Instala las dependencias del proyecto:

npm install

### 2. Ejecución

Inicia la aplicación en modo de desarrollo:

npm run start

El frontend estará disponible en http://localhost:4200.
