import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-2.9417, 43.4161],
      zoom: 12,
      accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ' 
    });

    new mapboxgl.Marker({
      color: 'red',
      draggable: true
    })
    .setLngLat([-2.9417, 43.4161])
    .addTo(this.map);



  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}
