import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'search-weather',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cityName: string = '';

  @Output()
  citySearch = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor(private route: ActivatedRoute) {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(city => {
      if (city.length === 0) {
        this.citySearch.emit('');  // Якщо місто порожнє, скидаємо пошук
      } else if (city.length > 2) {
        this.citySearch.emit(city);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['city']) {
        this.cityName = params['city'];
        this.onSearch();
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.cityName);
  }
}
