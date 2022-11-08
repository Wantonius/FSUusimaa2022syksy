import {Component} from '@angular/core';
import {Apple} from '../models/apple.model'

@Component({
	selector:"template-form",
	templateUrl:"./templateform.component.html"
})
export class TemplateForm {
	apples:Apple[] = [];
	apple:Apple = new Apple("");
	
	addApple() {
		this.apples.push(this.apple);
		this.apple = new Apple("");
	}
	
	eatApple(idx:number) {
		this.apples.splice(idx,1);
	}
}