import { Component, OnInit } from '@angular/core';
import { Country } from '../../countryApp/interfaces/country.interface';
import { CountriesService } from '../../countryApp/services/countries.service';


@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent   implements OnInit{
  public  countries: Country[]=[]
  public isLoading: boolean =false;
  public initialValue: string ='';

  constructor (private countriesService: CountriesService){

  }

 searchByCountry( term:string){
  this.isLoading = true;

 this.countriesService.searchCountry(term).subscribe(countries => {
   this.countries = countries;
   this.isLoading = false
 })

 }

 ngOnInit(): void {
  this.countries = this.countriesService.cacheStore.byCountries.countries;
  this.initialValue = this.countriesService.cacheStore.byCountries.term;
}

}
