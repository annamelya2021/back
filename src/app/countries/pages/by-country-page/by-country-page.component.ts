import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { CountriesService } from '../../countryApp/services/countries.service';
import { Country } from '../../countryApp/interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [`
    .map-container {
      width: 100%;
      height: 500px;
    }
    button {
      margin-top: 10px;
    }
  `]
})
export class ByCountryPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  public selectedCountry?: Country; 

  private map!: mapboxgl.Map;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1,
     accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ'

    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;

      if (this.countries.length > 0) {
        this.selectedCountry = this.countries[0];
      }
    });
  }

  goToCountry(): void {
    if (this.selectedCountry && this.selectedCountry.latlng) {
      const [lat, lng] = this.selectedCountry.latlng;

      this.map.flyTo({
        center: [lng, lat],
        zoom: 5,
        essential: true
      });
    }
  }
}
