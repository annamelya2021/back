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
      transition: transform 0.3s ease-in-out; /* Додаємо плавну анімацію до зображення */
    }

    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease; /* Плавний ефект для всієї картки */
    }

    .card:hover {
      transform: translateY(-5px); /* Піднімаємо картку при наведенні */
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Додаємо тінь при наведенні */
    }

    .card:hover {
      transform: scale(1.05); /* Збільшуємо зображення при наведенні */
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
