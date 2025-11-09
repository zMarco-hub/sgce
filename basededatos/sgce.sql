-- Elimina el esquema 'public' y todos sus objetos si existen, y lo recrea limpio
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- Extensión para usar funciones criptográficas (por ejemplo, pgcrypto para hash de contraseñas)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tipo enumerado para los roles posibles del sistema
CREATE TYPE roles AS ENUM ('ADMIN', 'DOCENTE', 'ESTUDIANTE');

-- Tabla que almacena los roles disponibles en el sistema
CREATE TABLE rol (
  id SERIAL PRIMARY KEY,         -- Identificador único del rol
  nombre roles UNIQUE NOT NULL   -- Nombre del rol (ADMIN, DOCENTE o ESTUDIANTE)
);

-- Tabla de usuarios genérica, base para docentes y estudiantes
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,                         -- Identificador único del usuario
  nombre VARCHAR(100) NOT NULL,                  -- Nombre del usuario
  apellido VARCHAR(100) NOT NULL,                -- Apellido del usuario
  email VARCHAR(120) UNIQUE NOT NULL,            -- Correo electrónico único
  password_hash VARCHAR(200) NOT NULL,           -- Contraseña cifrada (hash)
  rol_id INT NOT NULL REFERENCES rol(id) ON UPDATE CASCADE,  -- Relación con tabla de roles
  activo BOOLEAN NOT NULL DEFAULT TRUE,          -- Estado del usuario (activo/inactivo)
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),   -- Fecha de creación
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()    -- Última actualización
);

-- Tabla específica para estudiantes
CREATE TABLE estudiante (
  id SERIAL PRIMARY KEY,                                         -- Identificador único del estudiante
  usuario_id INT UNIQUE NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,  -- Relación 1 a 1 con usuario
  codigo VARCHAR(30) UNIQUE NOT NULL                             -- Código institucional único del estudiante
);

-- Tabla específica para docentes
CREATE TABLE docente (
  id SERIAL PRIMARY KEY,                                         -- Identificador único del docente
  usuario_id INT UNIQUE NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,  -- Relación 1 a 1 con usuario
  titulo VARCHAR(120)                                            -- Título académico del docente (opcional)
);

-- Tabla de cursos impartidos en una gestión (semestre o periodo académico)
CREATE TABLE curso (
  id SERIAL PRIMARY KEY,                                         -- Identificador único del curso
  nombre VARCHAR(120) NOT NULL,                                  -- Nombre del curso
  docente_id INT NOT NULL REFERENCES docente(id) ON DELETE RESTRICT, -- Docente responsable
  gestion VARCHAR(20) NOT NULL,                                  -- Gestión o semestre (por ejemplo, "2025-1")
  activo BOOLEAN NOT NULL DEFAULT TRUE,                          -- Estado del curso (activo/inactivo)
  UNIQUE (nombre, gestion, docente_id)                           -- Evita duplicados del mismo curso en una gestión con el mismo docente
);

-- Tabla de inscripciones de estudiantes en cursos
CREATE TABLE inscripcion (
  id SERIAL PRIMARY KEY,                                         -- Identificador único de la inscripción
  estudiante_id INT NOT NULL REFERENCES estudiante(id) ON DELETE CASCADE, -- Estudiante inscrito
  curso_id INT NOT NULL REFERENCES curso(id) ON DELETE CASCADE,  -- Curso en el que se inscribe
  fecha TIMESTAMP NOT NULL DEFAULT NOW(),                        -- Fecha de inscripción
  UNIQUE (estudiante_id, curso_id)                               -- Un estudiante no puede inscribirse dos veces al mismo curso
);

-- Tabla de evaluaciones (exámenes, tareas, proyectos, etc.) dentro de un curso
CREATE TABLE evaluacion (
  id SERIAL PRIMARY KEY,                                         -- Identificador único de la evaluación
  curso_id INT NOT NULL REFERENCES curso(id) ON DELETE CASCADE,  -- Curso al que pertenece la evaluación
  titulo VARCHAR(120) NOT NULL,                                  -- Título o nombre de la evaluación
  tipo VARCHAR(40) NOT NULL,                                     -- Tipo (EXAMEN, TAREA, PROYECTO, etc.)
  fecha DATE NOT NULL,                                           -- Fecha de la evaluación
  ponderacion NUMERIC(5,2) NOT NULL CHECK (ponderacion > 0 AND ponderacion <= 100)  -- Porcentaje de la nota total del curso
);

-- Tabla de notas obtenidas por los estudiantes en cada evaluación
CREATE TABLE notas (
  id SERIAL PRIMARY KEY,                                         -- Identificador único del registro de nota
  evaluacion_id INT NOT NULL REFERENCES evaluacion(id) ON DELETE CASCADE,  -- Evaluación correspondiente
  estudiante_id INT NOT NULL REFERENCES estudiante(id) ON DELETE CASCADE,  -- Estudiante evaluado
  nota NUMERIC(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 100),  -- Calificación obtenida
  feedback TEXT,                                                 -- Comentarios o retroalimentación opcional
  UNIQUE (evaluacion_id, estudiante_id)                          -- Un estudiante solo puede tener una nota por evaluación
);
