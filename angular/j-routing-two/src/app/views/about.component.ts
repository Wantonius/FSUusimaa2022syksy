import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector:"about",
	templateUrl:"./about.component.html"
})
export class About {
	
	name:string = "";
	
	constructor(private router:Router) {}

	goToSecretPage() {
		if(this.name) {
			this.router.navigate(["/secret"], {queryParams:{name:this.name}});
		}
	}
}