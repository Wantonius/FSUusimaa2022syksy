import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import  {ContactList} from './components/contactlist.component';
import {ContactService} from './services/contactservice.service';

@NgModule({
  declarations: [
    AppComponent,
	ContactList
  ],
  imports: [
    BrowserModule,
	FormsModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
