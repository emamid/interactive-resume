import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    loadComponent: () => import('./views/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./views/project/project').then((m) => m.Project),
  },
  {
    path: 'employers/:id',
    loadComponent: () => import('./views/employer/employer').then((m) => m.Employer),
  },
  {
    path: 'tags',
    loadComponent: () => import('./views/tags/tags').then((m) => m.Tags),
  },
  {
    path: 'tags/:id',
    loadComponent: () => import('./views/tag/tag').then((m) => m.Tag),
  },
  {
    path: 'api/rest',
    loadComponent: () => import('./views/rest-api/rest-api').then((m) => m.RestApi),
  },
  {
    path: 'visualize',
    loadComponent: () => import('./views/visualize/visualize').then((m) => m.Visualize),
  },
  {
    path: 'data-table',
    loadComponent: () => import('./views/data-table/data-table').then((m) => m.DataTable),
  },
  { path: '**', redirectTo: '' },
];
