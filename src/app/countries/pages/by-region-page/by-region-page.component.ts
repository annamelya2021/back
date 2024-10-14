import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Country } from '../../countryApp/interfaces/country.interface';
import { Region } from '../../countryApp/interfaces/region.type';
import { CountriesService } from '../../countryApp/services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',

})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  public map!: mapboxgl.Map;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.initMap();
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchRegion(region).subscribe(countries => {
      this.countries = countries;
      this.updateMap();
      this.isLoading = false;
    });
  }

  private initMap(): void {

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2,
      accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ' // Початковий масштаб
    });
  }

  private updateMap(): void {
    if (this.selectedRegion === 'Africa') {
      this.map.flyTo({ center: [20, 10], zoom: 1.5 });
    } else if (this.selectedRegion === 'Americas') {
      this.map.flyTo({ center: [-100, 40], zoom: 1 });
    } else if (this.selectedRegion === 'Asia') {
      this.map.flyTo({ center: [100, 30], zoom: 2 });
    } else if (this.selectedRegion === 'Europe') {
      this.map.flyTo({ center: [10, 50], zoom: 2 });
    } else if (this.selectedRegion === 'Oceania') {
      this.map.flyTo({ center: [140, -25], zoom: 3 });
    }
  }
}
