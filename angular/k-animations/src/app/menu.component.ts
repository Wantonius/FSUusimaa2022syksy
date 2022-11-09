import {Component,HostListener} from '@angular/core'

@Component({
	selector:"app-menu",
	templateUrl:"./menu.component.html",
	styleUrls:["./menu.component.css"]
})
export class AppMenu {
	
	@HostListener('click',['$event.target'])
	onClick(target:any) {
		console.log("Menu, clicked item:"+target.id)
	}
}