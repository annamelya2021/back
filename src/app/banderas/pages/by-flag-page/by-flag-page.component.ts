import { Component, OnInit } from '@angular/core';


import { Country } from '../../../countries/countryApp/interfaces/country.interface';
import { CountriesService } from '../../../countries/countryApp/services/countries.service';


@Component({
  selector: 'app-by-flag-page',
  templateUrl: './by-flag-page.component.html',
  styles: [`
    .img-flag {
      width: 100%;
      height: 200px;
      object-fit: cover;
      object-position: center;
    }
  `]
})
export class ByFlagPageComponent implements OnInit {
  public countries: Country[] = [];
  public filteredCountries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  public selectedCountry: Country | null = null;
  public showModal: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.countriesService.getAllCountries().subscribe(countries => {
      this.countries = countries;
      this.filteredCountries = countries;
      this.isLoading = false;
    });
  }

  searchByFlag(term: string) {
    if (!term) {
      this.filteredCountries = this.countries;
    } else {
      this.filteredCountries = this.countries.filter(country =>
        country.name.common.toLowerCase().includes(term.toLowerCase())
      );
    }
  }

  openCountryDetails(country: Country) {
    this.selectedCountry = country;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCountry = null;
  }
}
