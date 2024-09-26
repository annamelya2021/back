import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CountryTableComponent } from './components/countryTable/countryTable.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { MainPageCountriesComponent } from './pages/main-page-countries/main-page-countries.component';
import { PopulationPageCopyComponent } from './pages/population-page copy/population.component';

@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
    CountryTableComponent,
    PopulationPageCopyComponent,
    MainPageCountriesComponent,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule,

  ],
  exports: [

  ],
})
export class CountriesModule {}
