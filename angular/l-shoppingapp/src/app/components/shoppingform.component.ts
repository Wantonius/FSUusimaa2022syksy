import {Component,OnInit} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {ShoppingService} from '../services/shoppingservice.service'
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router';

@Component({
	selector:"shoppingform",
	templateUrl:"./shoppingform.component.html",
	styleUrls:["./shoppingform.component.css"]
})
export class ShoppingForm implements OnInit {
	
	item:ShoppingItem = new ShoppingItem("",0,0,0);
	
	constructor(private shopping:ShoppingService,private login:LoginService,private router:Router) {}
	
	ngOnInit() {
		if(!this.login.isUserLogged()) {
			this.router.navigate(["/"]);
		}
	}
	
	addItem() {
		this.shopping.addItem(this.item).subscribe(
			data => console.log(data),
			error => console.log(error),
			() => {
				this.item = new ShoppingItem("",0,0,0)
			}
		)
	}
}