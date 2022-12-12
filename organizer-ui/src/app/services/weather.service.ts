import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {WeatherForecast} from "../models/weather-forecast";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() {
  }

  public getForecast(): Observable<WeatherForecast[]> {
    return of([
      {
        date: new Date(),
        temperatureC: 20,
        temperatureF: 60,
        summary: 'Test Weather'
      }
    ]);
  }

  public getCurrent(): Observable<WeatherForecast> {
    return of({
      date: new Date(),
      temperatureC: 20,
      temperatureF: 60,
      summary: 'Test Weather'
    });
  }
}
