import {Component} from '@angular/core';
import {LoginService} from '../services/loginservice.service';
import {Router} from '@angular/router';

@Component({
	selector:"navbar",
	templateUrl:"./navbar.component.html"
})
export class Navbar {
	constructor(private login:LoginService,private router:Router) {}
	
	isUserLogged() {
		return this.login.isUserLogged()
	}
	
	logout() {
		this.login.logout().subscribe(
			data => console.log(data),
			error => {
				this.login.setLoginState(false,"");
				this.router.navigate(["/"]);
			},
			() => {
				this.login.setLoginState(false,"");
				this.router.navigate(["/"]);
			}
		)
	}
}