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
  public selectedCountry?: Country; // Додано для зберігання обраної країни

  private map!: mapboxgl.Map;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;

    // Ініціалізація карти
    this.map = new mapboxgl.Map({
      container: 'map', // ID контейнера для карти
      style: 'mapbox://styles/mapbox/streets-v11', // Стиль карти
      center: [0, 0], // Початкові координати [довгота, широта]
      zoom: 1, // Початковий масштаб
     accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ'

    });
  }

  ngOnDestroy(): void {
    // Знищуємо карту перед виходом з компонента
    if (this.map) {
      this.map.remove();
    }
  }

  // Метод для пошуку країни
  searchByCountry(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;

      // Вибір першої валідної країни
      if (this.countries.length > 0) {
        this.selectedCountry = this.countries[0]; // Можна вибрати будь-яку країну
      }
    });
  }

  // Метод для переміщення карти до координат обраної країни
  goToCountry(): void {
    if (this.selectedCountry && this.selectedCountry.latlng) {
      const [lat, lng] = this.selectedCountry.latlng; // Широта та довгота

      this.map.flyTo({
        center: [lng, lat], // Міняємо місцями координати для Mapbox
        zoom: 5, // Рівень масштабу
        essential: true // Плавна анімація
      });
    }
  }
}
