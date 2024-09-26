import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'card-weather',
  templateUrl: './card.component.html',
})
export class WeatherComponent implements OnInit {
  MyWeather:any;
  temperature:number =0;
  feelsLikeTemp:number =0;
  humidity: number= 0;
  pressure: number=0;
  summary:string = '';
  iconUrl:string= ''
  country: string = '';
  sunrise: string = '';
  sunset: string = '';


  constructor(private weatherService:WeatherService, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {}

  recommendation: string = '';

  getRecommendation(weatherMain: string) {
    switch (weatherMain) {
      case 'Clear':
        this.recommendation = 'It\'s sunny! A great day for a walk or outdoor activities.';
        break;
      case 'Rain':
        this.recommendation = 'It\'s raining. How about some indoor activities, like reading or watching a movie?';
        break;
      case 'Snow':
        this.recommendation = 'Snowy weather! Perfect for building a snowman or going skiing.';
        break;
        case 'Clouds':
        this.recommendation = 'Clouds weather! Perfect for hiking.';
        break;
      default:
      this.recommendation = 'Check the weather and plan accordingly.';
    }
  }

  onCitySearch(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (res) => {
        this.MyWeather = res;
        this.temperature = this.MyWeather.main.temp;
        this.feelsLikeTemp = this.MyWeather.main.feels_like;
        this.humidity = this.MyWeather.main.humidity;
        this.pressure = this.MyWeather.main.pressure;
        this.summary = this.MyWeather.weather[0].main;
        this.iconUrl = 'https://openweathermap.org/img/wn/' + this.MyWeather.weather[0].icon + '@2x.png';
        this.country = this.MyWeather.sys.country;
        this.sunrise = new Date(this.MyWeather.sys.sunrise * 1000).toLocaleTimeString();
        this.sunset = new Date(this.MyWeather.sys.sunset * 1000).toLocaleTimeString();
        this.getRecommendation(this.summary);  // Додано виклик рекомендацій
      },
      error: (error) => {
        console.log(error.message);
        this.snackBar.open('City not found or API error', 'Close', { duration: 3000 });
      },
      complete: () => console.info('Api call completed')
    });
  }
}
