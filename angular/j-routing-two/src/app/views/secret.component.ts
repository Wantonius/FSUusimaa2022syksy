import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';

@Component({
	selector:"secret",
	templateUrl:"./secret.component.html"
})
export class Secret implements OnInit {
	
	name:string = ""
	
	constructor(private route:ActivatedRoute) {}
	
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.name = params['name'];
		})
	}
}