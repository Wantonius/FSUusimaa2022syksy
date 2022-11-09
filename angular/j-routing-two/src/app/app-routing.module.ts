import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Home} from './views/home.component';
import {About} from './views/about.component';
import {Secret} from './views/secret.component';

const routes: Routes = [
{
	path:"",component:Home
},
{
	path:"about",component:About
},
{
	path:"secret",component:Secret
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
