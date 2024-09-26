import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string = '4079abfeea565fa5f716eec8df5dd8c7';
  private currentWeatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.currentWeatherUrl}?q=${city}&appid=${this.apiKey}&units=imperial`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
