
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map, Observable,of} from 'rxjs';
import { CacheStore } from '../interfaces/cahe-store.interface';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})
export class CountriesService {
 private apiUrl: string ='https://restcountries.com/v3.1'
 public cacheStore: CacheStore = {
  byCapital: {term: '', countries: []},
  byCountries: {term: '', countries: []},
  byRegion: {region: '', countries: []},
  byFlag:  {term: '', countries: []},
 }

  constructor(private http: HttpClient, ) {
    this.loadFromLocalStorage()
  }

private saveToLocalStorage(){
 localStorage.setItem( 'cacheStore', JSON.stringify(this.cacheStore))
}

private loadFromLocalStorage(){
 if(!localStorage.getItem('cacheStore')) return;
  this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
}

  private getcountriesRequest(url: string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([])),
     /*  delay(2000), */
    )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

    searchCapital(term: string): Observable<Country[]>{
      const url = `${this.apiUrl}/capital/${term}`
     return this.getcountriesRequest(url)
     .pipe(
      tap(countries => this.cacheStore.byCapital = { term,  countries
      }),
      tap(()=> this.saveToLocalStorage())
     )

    }

    // searchCountry(term: string): Observable<Country[]>{
    //   const url = `${this.apiUrl}/name/${term}`
    //  return this.http.get<Country[]>(url)
    //  .pipe(
    //   tap(countries => this.cacheStore.byCountries = { term,  countries
    //   }),
    //   tap(()=> this.saveToLocalStorage())
    //  )
    // }

    getAllCountries(): Observable<Country[]> {
      const url = `${this.apiUrl}/all`;
      return this.http.get<Country[]>(url)
        .pipe(
          catchError(error => of([]))
        );
    }


    searchCountry(term: string): Observable<Country[]> {
      const url = `${this.apiUrl}/name/${term}`;
      return this.getcountriesRequest(url)
        .pipe(
          tap(countries => this.cacheStore.byCountries = { term, countries }),
          tap(() => this.saveToLocalStorage())
        );
    }



    searchRegion(region: Region): Observable<Country[]>{
      const url = `${this.apiUrl}/region/${region}`
     return this.http.get<Country[]>(url)
     .pipe(
      tap(countries => this.cacheStore.byRegion = { region,  countries
      }),
      tap(()=> this.saveToLocalStorage())
     )
    }


     searchFlag(term: string): Observable<Country[]>{
      const url = `${this.apiUrl}/region/${term}`
     return this.http.get<Country[]>(url)
     .pipe(
      tap(countries => this.cacheStore.byFlag = { term,  countries
      }),
      tap(()=> this.saveToLocalStorage())
     )
    }


  }


