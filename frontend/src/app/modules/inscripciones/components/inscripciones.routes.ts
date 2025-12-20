import { Routes } from '@angular/router';
import { InscripcionList } from './inscripcion-list/inscripcion-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { InscripcionForm } from './inscripcion-form/inscripcion-form';

export const INSCRIPCIONES_ROUTES: Routes = [
  {
    path: '',
    component: InscripcionList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] }, // Docentes pueden ver inscripciones
  },
  {
    path: 'crear',
    component: InscripcionForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] }, // Solo admin puede crear
  },
  {
    path: 'editar/:id',
    component: InscripcionForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN'] }, // Solo admin puede editar
  },
];
