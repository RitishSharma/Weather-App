import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class weatherService{
    constructor(private httpClient: HttpClient) {}

    weatherApiUrl: string = 'https://samples.openweathermap.org/data/2.5/forecast?q=';
     APIKEY = "b6907d289e10d714a6e88b30761fae22";

    getData(enteredCity: any) {
        let params = new HttpParams();
        if (!!enteredCity) {
            return this.httpClient.get<any>(this.weatherApiUrl + enteredCity + '&appid=' + this.APIKEY);
        }
    }
}
        
