import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByFlagPageComponent } from './pages/by-flag-page/by-flag-page.component';

const routes: Routes = [
   {
    path: '',
    component: ByFlagPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanderasRoutingModule { }
