import { Routes } from '@angular/router';
import { EvaluacionList } from './evaluacion-list/evaluacion-list';
import { AuthGuard } from '../../../core/guards/auth-guard';
import { RolesGuard } from '../../../core/guards/roles-guard';
import { EvaluacionForm } from './evaluacion-form/evaluacion-form';

export const EVALUACIONES_ROUTES: Routes = [
  {
    path: '',
    component: EvaluacionList,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
  {
    path: 'crear',
    component: EvaluacionForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
  {
    path: 'editar/:id',
    component: EvaluacionForm,
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: ['ADMIN', 'DOCENTE'] },
  },
  //   {
  //     path: ':id/notas',
  //     component: NotasEvaluacion,
  //     canActivate: [AuthGuard, RolesGuard],
  //     data: { roles: ['ADMIN', 'DOCENTE'] },
  //   },
];
