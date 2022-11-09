import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPage} from './components/loginpage.component';
import {ShoppingForm} from './components/shoppingform.component';
import {ShoppingList} from './components/shoppinglist.component';
const routes: Routes = [
{
	path:"",component:LoginPage
},
{
	path:"list",component:ShoppingList
},
{
	path:"form",component:ShoppingForm
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
