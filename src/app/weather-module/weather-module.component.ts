import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, filter, takeUntil } from "rxjs/operators";
import { fromEvent, of, Subject } from 'rxjs';
import { weatherService } from '../service/weather-service.service';

@Component({
  selector: 'weather-module',
  templateUrl: './weather-module.component.html',
  styleUrls: ['./wearther-module.component.css'],
})
export class WeatherComponent implements OnInit {

  constructor(private weatherservice: weatherService) {}
  // getting value types in input field 
  @ViewChild('searchedCity', { static: true }) searchedCity: ElementRef;
  // array to hold the response
  fetchedData = [];
  // global variable to contain formatted date
  formattedDate;
  // subject to unsubscribe in ngOnDestro
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(){
  }

  ngAfterViewInit() {
  // initializing form event so as to keep track of input typed after
    this.getData();
  }

  // calling subscription method
    getData() {
      fromEvent(this.searchedCity.nativeElement, 'keyup').pipe(
        map((event: any) => {
          return event.target.value;
        })
        ,filter( res => res.length >= 3)
        ,debounceTime(400)
        ,distinctUntilChanged()
      ).subscribe((item: string) => {
        this.subscribeToData(item);
      })
    }

// subscription
    subscribeToData(item: string) {
          this.callWeatherApi(item).subscribe((res) => {
            if (res.length !== 0) {
              this.clearData();
              this.fetchedData.push(res);
              console.log(res);
            }
          })
        }

// weather api call
    callWeatherApi(searchItem: string) {
      if (searchItem.length <= 3) {
          this.clearData();
          return of ([]);
      }
      return this.weatherservice.getData(searchItem).pipe(takeUntil(this.destroy$));
    }

    clearData() {
      this.fetchedData = [];
    }

    ngOnDestroy() {
      this.destroy$.next(true);
      // Unsubscribe from the subject
      this.destroy$.unsubscribe();
    }
}
