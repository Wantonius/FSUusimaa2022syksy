import {Component} from '@angular/core';

@Component({
	selector:"basket",
	templateUrl:"./basket.component.html"
})
export class Basket {
	message:string = "";
	
	getMessage(message:string) {
		this.message = "The apple color is "+message
	}
}