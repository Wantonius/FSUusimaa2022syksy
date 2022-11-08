import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Apple} from './apple.component';
import {Basket} from './basket.component';

@NgModule({
  declarations: [
    AppComponent,
	Apple,
	Basket
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
