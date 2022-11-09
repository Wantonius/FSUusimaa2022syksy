import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {Home} from './views/home.component';
import {About} from './views/about.component';
import {Secret} from './views/secret.component';

@NgModule({
  declarations: [
    AppComponent,
	Home,
	About,
	Secret
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
