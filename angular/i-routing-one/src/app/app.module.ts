import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ContactList} from './components/contactlist.component';
import {ContactForm} from './components/contactform.component';

import {ContactService} from './services/contactservice.service';
@NgModule({
  declarations: [
    AppComponent,
	ContactList,
	ContactForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
