import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactList } from './components/contactlist.component';
import {ContactForm} from './components/contactform.component';

const routes: Routes = [
{
	path:"",component:ContactList
},
{
	path:"form",component:ContactForm
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
