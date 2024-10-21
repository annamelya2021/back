import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;
  userMarker!: mapboxgl.Marker | null;
  polylineLayerId: string = 'route';
  defaultCenter: [number, number] = [-2.9417, 43.4161];
  defaultZoom: number = 12;

  ngOnInit(): void {
    this.initMap();
    this.getUserLocation();
  }

  private initMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard-satellite',
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      accessToken: 'pk.eyJ1IjoiYW5uYW1lbHlhIiwiYSI6ImNtMWt0cGVvcjAybTYybHNlMW1hdmVmbjQifQ.g-UW6f6pr02vcC8MHcIOPQ'
    });


    new mapboxgl.Marker({
      color: 'red',
      draggable: true
    })
    .setLngLat(this.defaultCenter)
    .addTo(this.map);
  }

  getUserLocation(): void {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userCoords: [number, number] = [position.coords.longitude, position.coords.latitude];

          if (this.userMarker) {
            this.userMarker.setLngLat(userCoords);
          } else {
            this.userMarker = new mapboxgl.Marker({
              color: 'blue',
              draggable: false
            })
            .setLngLat(userCoords)
            .addTo(this.map);
          }


          this.map.flyTo({
            center: userCoords,
            zoom: 14
          });

          this.updatePolyline(this.defaultCenter, userCoords);
        },
        error => {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private updatePolyline(start: [number, number], end: [number, number]): void {
    if (this.map.getLayer(this.polylineLayerId)) {
      this.map.removeLayer(this.polylineLayerId);
      this.map.removeSource(this.polylineLayerId);
    }

    this.map.addLayer({
      id: this.polylineLayerId,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [start, end],
          },
        },
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#007cbf',
        'line-width': 4
      }
    });
  }

  clearUserLocation(): void {
    if (this.userMarker) {
      this.userMarker.remove();
      this.userMarker = null;
    }
    if (this.map.getLayer(this.polylineLayerId)) {
      this.map.removeLayer(this.polylineLayerId);
      this.map.removeSource(this.polylineLayerId);
    }
    this.map.flyTo({
      center: this.defaultCenter,
      zoom: this.defaultZoom
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
