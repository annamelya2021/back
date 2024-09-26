import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanderasRoutingModule } from './banderas-routing.module';
import { ByFlagPageComponent } from './pages/by-flag-page/by-flag-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ByFlagPageComponent
  ],
  imports: [
    CommonModule,
    BanderasRoutingModule,
    SharedModule,
  ],
  exports: [
    ByFlagPageComponent
  ],
})
export class BanderasModule { }
