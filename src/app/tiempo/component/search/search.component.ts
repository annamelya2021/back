import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'search-weather',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  cityName: string = '';

  @Output()
  citySearch = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(1000)  // затримка в 500 мс після натискання клавіші
    ).subscribe(city => {
      if (city) {
        this.citySearch.emit(city);
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.cityName);  // оновлення значення для пошуку
  }
}
