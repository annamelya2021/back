import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './shared/pages/error404/error404.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [

   {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [PublicGuard],
  },

   {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule),
 canActivate: [AuthGuard , AdminGuard],
    canMatch: [AuthGuard ,AdminGuard]
  },
  {
  path: 'weather',
  loadChildren: () => import('./tiempo/tiempo.module').then( m => m.TiempoModule ),
  canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
},
{
  path: 'flags',
  loadChildren: () => import('./banderas/banderas.module').then( m => m.BanderasModule ),
  canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
},

{
  path: 'maps',
  loadChildren: () => import('./map/map.module').then( m => m.MapModule),
  canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
},

  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
