import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './pages/map/map.component';
import { SharedModule } from '../shared/shared.module';
import { MapDisplayComponent } from './components/map-display/map-display.component';


@NgModule({
  declarations: [
    MapComponent,
    MapDisplayComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    SharedModule,
  ],
  exports: [
    MapComponent
  ],
})
export class MapModule { }
