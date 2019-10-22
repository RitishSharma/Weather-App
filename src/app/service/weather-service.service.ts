import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { weatherApiUrl, weatherApiKey} from './weather-service.endpoint';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class weatherService{
    constructor(private httpClient: HttpClient) {}

    getData(enteredCity: string) {
        let params = new HttpParams();
        params = params.append('APPID',weatherApiKey );
            return this.httpClient.get<any>(weatherApiUrl + enteredCity, {params: params})
            .pipe(
                catchError(this.handleError)
                );
             }
    handleError(error: HttpErrorResponse) {
        return throwError(error);
      }
}
        
