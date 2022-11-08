import {Component,Input} from '@angular/core'

@Component({
	selector:"hello-world",
	templateUrl:"./helloworld.component.html"
})
export class HelloWorld {
	@Input() name = "World"
}