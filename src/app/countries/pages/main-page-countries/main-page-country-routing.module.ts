import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageCountriesComponent } from './main-page-countries.component';
import { ByCapitalPageComponent } from '../by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from '../by-country-page/by-country-page.component';
import { ByRegionPageComponent } from '../by-region-page/by-region-page.component';
import { CountryPageComponent } from '../country-page/country-page.component';
import { PopulationPageCopyComponent } from '../population-page copy/population.component';

const routes:Routes= [

  {
    path: '',
    component: MainPageCountriesComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
   {
        path: 'by-region',
        component: ByRegionPageComponent,
      },

      {
        path: 'by/:id',
        component: CountryPageComponent,
      },

      {
        path: 'populationcopy',
        component:  PopulationPageCopyComponent  ,
      },
       {
        path: '**' ,
        redirectTo: 'by-capital',
      },
    ]

    }
]


@NgModule({
  imports: [
RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class MainCountriesRoutingModule { }
