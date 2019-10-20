import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { weatherService } from '../service/weather-service.service';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
import { fromEvent, of } from 'rxjs';

@Component({
  selector: 'weather-module',
  templateUrl: './weather-module.component.html',
  styleUrls: ['./wearther-module.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherservice: weatherService) {}
  // getting value types in input field 
  @ViewChild('searchedCity', { static: true }) searchedCity: ElementRef;
  // array to hold the response
  fetchedData = [];
  // global variable to contain formatted date
  formattedDate;

  ngOnInit(){
    // initializing form event so as to keep track of input typed after
      this.getData();
  }

  // calling service on typed city
    getData() {
      fromEvent(this.searchedCity.nativeElement, 'keyup').pipe(
        map((event: any) => {
          return event.target.value;
        })
        ,filter( res => res.length >= 3)
        ,debounceTime(400)
        ,distinctUntilChanged()
      ).subscribe((item: string) => {
          this.callWeatherApi(item).subscribe((res) => {
            if (res.length !== 0) {
              this.clearData();
              this.fetchedData.push(res.list);
              this.fetchedData[0].forEach( obj => {              
                this.formatDate(new Date(obj.dt_txt));
              });
            }
          }, (err) => {
            alert(err);
          })
      })
    }
// weather api call
    callWeatherApi(searchItem: string) {
      if (searchItem.length <= 3) {
          this.clearData();
          return of ([]);
      }
      return this.weatherservice.getData(searchItem);
    }

    // formatting date
    formatDate(date: any) {
      let d = date.getDate();
      let m = date.getMonth() + 1; //Month from 0 to 11
      let y = date.getFullYear();
      return this.formattedDate =  '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    clearData() {
      this.fetchedData = [];
    }
}
