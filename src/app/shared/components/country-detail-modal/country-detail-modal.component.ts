import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Country } from '../../../countries/countryApp/interfaces/country.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';  // Додаємо Router

@Component({
  selector: 'app-country-detail-modal',
  templateUrl: './country-detail-modal.component.html',
  styleUrls: ['./country-detail-modal.component.css']
})
export class CountryDetailModalComponent implements OnChanges {
  @Input() country!: Country;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  capitalCoords: { lat: number, lng: number } | undefined;
  mapUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  ngOnChanges() {
    this.capitalCoords = this.getCapitalCoordinates();
    if (this.capitalCoords) {
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://maps.google.com/maps?q=${this.capitalCoords.lat},${this.capitalCoords.lng}&z=12&output=embed`
      );
      // console.log('Map URL:', this.mapUrl);
    }
  }

  closeModal() {
    this.close.emit();
  }

  searchWeatherForCapital() {
    this.router.navigate(['/weather'], { queryParams: { city: this.country.capital[0] } });
    this.closeModal();
  }

 getCapitalCoordinates() {
  if (this.country && this.country.capitalInfo && this.country.capitalInfo.latlng) {
    const [lat, lng] = this.country.capitalInfo.latlng;
    return { lat, lng };
  }
  return undefined;
}
}
