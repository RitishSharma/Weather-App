import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WeatherComponent } from './weather-module.component';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class WeatherModule { } 