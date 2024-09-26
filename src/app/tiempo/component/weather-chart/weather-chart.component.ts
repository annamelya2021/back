import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html'
})
export class WeatherChartComponent implements OnChanges {

  @Input() city: string = '';
  chart: Chart | undefined;

  constructor(private weatherService: WeatherService) {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city'] && this.city) {
      this.weatherService.getForecast(this.city).subscribe(data => {
        this.createChart(data);
      });
    }
  }

  createChart(data: any) {
    const labels = data.list.map((item: any) => item.dt_txt);
    const temperatures = data.list.map((item: any) => item.main.temp);
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, {
      type: 'bar', // Можна змінити на 'bar', 'line', 'pie', 'doughnut', 'polarArea'
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
