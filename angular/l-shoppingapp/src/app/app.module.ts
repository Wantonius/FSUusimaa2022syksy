import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';


import {LoginPage} from './components/loginpage.component';
import {ShoppingForm} from './components/shoppingform.component';
import {ShoppingList} from './components/shoppinglist.component';
import {Navbar} from './components/navbar.component';
import {LoginService} from './services/loginservice.service';
import {ShoppingService} from './services/shoppingservice.service';
@NgModule({
  declarations: [
    AppComponent,
	LoginPage,
	ShoppingForm,
	ShoppingList,
	Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [LoginService,ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
