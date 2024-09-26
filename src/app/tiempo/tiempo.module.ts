import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiempoRoutingModule } from './tiempo-routing.module';
import { WeatherPageComponent } from './pages/weather-page/weather-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WeatherChartComponent } from './component/weather-chart/weather-chart.component';
import { WeatherComponent } from './component/card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './component/search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WeatherPageComponent,
    WeatherComponent,
    WeatherChartComponent,
    SearchComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    TiempoRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    BaseChartDirective,
    FormsModule,
    
  ],
  exports: [
    WeatherPageComponent
    ]
})
export class TiempoModule { }
