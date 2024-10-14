import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Country } from '../../../countries/countryApp/interfaces/country.interface';


@Component({
  selector: 'app-map-display',
  template: '<div id="map" style="height: 300px; width: 100%;"></div>',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  @Input() country!: Country;
  map!: mapboxgl.Map;

  ngOnInit(): void {
    this.initMap();
  }
private initMap(): void {

  if (!this.country || !this.country.latlng || this.country.latlng.length !== 2) {
    console.error("Invalid latlng for the country", this.country);
    return;
  }

  const [lng, lat] = this.country.latlng;

  this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 5
  });


  new mapboxgl.Marker()
    .setLngLat([lng, lat])
}

}
