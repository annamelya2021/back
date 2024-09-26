import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from '../../../countries/countryApp/interfaces/country.interface';


@Component({
  selector: 'app-country-detail-modal',
  templateUrl: './country-detail-modal.component.html',
  styleUrls: ['./country-detail-modal.component.css']
})
export class CountryDetailModalComponent {
  @Input() country!: Country;
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
