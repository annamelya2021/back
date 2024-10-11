import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
      debounceTime(1000)
    ).subscribe(city => {
      if (city) {
        this.citySearch.emit(city);
      }
    });
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.cityName = city;
        this.onSearch();
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.cityName);
  }
}
