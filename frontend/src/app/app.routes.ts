import { Routes } from '@angular/router';
import { Login } from './modules/auth/components/login/login';
import { USUARIOS_ROUTES } from './modules/usuarios/components/usuarios.routes';
import { DOCENTES_ROUTES } from './modules/docentes/components/docentes.routes';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ESTUDIANTES_ROUTES } from './modules/estudiantes/components/estudiantes.routes';
import { CURSOS_ROUTES } from './modules/cursos/components/cursos.routes';
import { INSCRIPCIONES_ROUTES } from './modules/inscripciones/components/inscripciones.routes';
import { EVALUACIONES_ROUTES } from './modules/evaluaciones/components/evaluaciones.routes';
import { NOTAS_ROUTES } from './modules/notas/components/notas.routes';

// Importar las rutas de usuarios

export const routes: Routes = [
  // Ruta pública
  { path: 'login', component: Login },

  // Ruta por defecto redirige a usuarios
  //{ path: '', redirectTo: 'usuarios', pathMatch: 'full' },

  // Rutas protegidas de usuarios
  {
    path: 'usuarios',
    //component: AdminLayout, // Usar el layout de administración
    children: USUARIOS_ROUTES, // Usar las rutas de usuarios
  },

  {
    path: 'docentes',
    children: DOCENTES_ROUTES, // Usar las rutas de docentes
  },

  {
    path: 'cursos',
    children: CURSOS_ROUTES,
  },
  // Rutas protegidas de estudiantes (NUEVO)
  {
    path: 'estudiantes',
    children: ESTUDIANTES_ROUTES,
  },

  {
    path: 'evaluaciones',
    children: EVALUACIONES_ROUTES,
  },

  {
    path: 'notas',
    children: NOTAS_ROUTES,
  },
  {
    path: 'inscripciones',
    children: INSCRIPCIONES_ROUTES,
  },
  // Ruta comodín
  { path: '**', redirectTo: 'usuarios' },
];
