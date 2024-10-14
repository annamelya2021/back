

import { Component, OnInit } from '@angular/core';
import { Country } from '../../countryApp/interfaces/country.interface';
import { CountriesService } from '../../countryApp/services/countries.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  public selectedCountry?: Country;
  public map!: mapboxgl.Map;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;

    const validCountries = this.countries.filter(country => country.latlng && country.latlng.length === 2);
    if (validCountries.length > 0) {
      this.selectedCountry = validCountries[0];
      // console.log("Selected country coordinates:", this.selectedCountry.latlng);
    }

    this.initMap();
  }


  private initMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-2.9417, 43.4161],
      zoom: 1,
      accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ'
    });
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term).subscribe((countries) => {
      // console.log("Countries fetched from API:", countries);
      this.countries = countries;
      this.isLoading = false;

      const validCountries = this.countries.filter(country => country.latlng && country.latlng.length === 2);
      if (validCountries.length > 0) {
        this.selectedCountry = validCountries[0];
        // console.log("New selected country coordinates:", this.selectedCountry.latlng);
      } else {
        console.warn("No valid countries with latlng found.");
      }
    });
  }

goToCountry(): void {
  if (this.selectedCountry && this.selectedCountry.latlng) {
    const [lat, lng] = this.selectedCountry.latlng;
    // console.log(`Navigating to: lng=${lng}, lat=${lat}`);
    this.map.flyTo({
      center: [lng, lat],
      zoom: 6,
      essential: true
    });
  } else {
    console.warn("No selected country or latlng is not available.");
  }
}
}

