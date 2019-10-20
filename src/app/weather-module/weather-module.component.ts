import { Component, OnInit } from '@angular/core';
import { weatherService } from '../service/weather-service.service';

@Component({
  selector: 'weather-module',
  templateUrl: './weather-module.component.html',
  styleUrls: ['./wearther-module.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherservice: weatherService) {}

  enteredCity;
  fetchedData = [];
  ngOnInit(){
  }

  getWeatherData(enteredCity) {
    if (!!enteredCity && enteredCity.length >= 3) {
      this.weatherservice.getData(enteredCity).subscribe( res => {
        this.fetchedData.push(res);
        console.log(' this.fetchedData',  this.fetchedData);
      });
    }
  }
}
