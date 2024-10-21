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

    this.map.on('style.load', () => {
      this.countries = this.countriesService.cacheStore.byRegion.countries;
      this.selectedRegion = this.countriesService.cacheStore.byRegion.region;

      if (this.selectedRegion) {
        this.updateMap();
      }
    });
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
      style: 'mapbox://styles/mapbox/standard',
      center: [0, 0],
      zoom: 2,
      accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ'
    });
  }

  private updateMap(): void {

    if (this.map.getLayer('continent-boundaries')) {
      this.map.removeLayer('continent-boundaries');
      this.map.removeSource('continent-boundaries');
    }

    const geojson = this.getGeoJsonForRegion(this.selectedRegion!);

    this.map.addSource('continent-boundaries', {
      type: 'geojson',
      data: geojson
    });

    this.map.addLayer({
      id: 'continent-boundaries',
      type: 'line',
      source: 'continent-boundaries',
      layout: {},
      paint: {
        'line-color': '#FF0000',
        'line-width': 3
      }
    });

    this.flyToRegion(this.selectedRegion!);
  }

  private flyToRegion(region: Region): void {
    if (region === 'Africa') {
      this.map.flyTo({ center: [20, 0], zoom: 2 });
    } else if (region === 'Americas') {
      this.map.flyTo({ center: [-85, 37], zoom: 1 });
    } else if (region === 'Asia') {
      this.map.flyTo({ center: [100, 30], zoom: 1 });
    } else if (region === 'Europe') {
      this.map.flyTo({ center: [10, 50], zoom: 2 });
    } else if (region === 'Oceania') {
      this.map.flyTo({ center: [135, -25], zoom: 3 });
    }
  }

  private getGeoJsonForRegion(region: Region): any {
    switch (region) {
      case 'Africa':
        return {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-25.0, -35.0], [50.0, -35.0], [50.0, 40.0], [-25.0, 40.0], [-25.0, -35.0]
                  ]
                ]
              }
            }
          ]
        };
      case 'Americas':
        return {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                 [
                  [-170.0, -60.0], [-30.0, -60.0], [-30.0, 70.0], [-170.0, 70.0], [-170.0, -60.0]
                ]
                ]
              }
            }
          ]
        };
      case 'Asia':
        return {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [26.435, 11.142], [26.435, 81.855], [168.021, 81.855],
                    [168.021, 11.142], [26.435, 11.142]
                  ]
                ]
              }
            }
          ]
        };
      case 'Europe':
        return {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-25.747, 36.956], [-25.747, 71.290], [50.116, 71.290],
                    [50.116, 36.956], [-25.747, 36.956]
                  ]
                ]
              }
            }
          ]
        };
      case 'Oceania':
        return {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [110.0, -55.0], [165.0, -55.0], [165.0, -10.0],
                    [110.0, -10.0], [110.0, -55.0]
                  ]
                ]
              }
            }
          ]
        };
      default:
        return {
          "type": "FeatureCollection",
          "features": []
        };
    }
  }
}
