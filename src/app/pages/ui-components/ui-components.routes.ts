import { Routes } from '@angular/router';

// ui

import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'datos',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'datos',
        component: AppFormsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['profesion'] },
      },
      {
        path: 'filtros',
        component: AppTablesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['reclutador'] },
      },
    ],
  },
];
