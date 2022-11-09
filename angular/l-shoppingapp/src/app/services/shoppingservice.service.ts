import {Injectable} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';
import {LoginService} from '../services/loginservice.service';
import {BackendMessage} from '../models/backendmessage.model';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class ShoppingService {
	
	constructor(private http:HttpClient,private login:LoginService) {}

	getList() {
		const httpOptions = {
			headers:new HttpHeaders({
				"Content-Type":"application/json",
				"token":this.login.getToken()
			})
		}
		return this.http.get<ShoppingItem[]>("/api/shopping",httpOptions)
	}
	
	addItem(item:ShoppingItem) {
		const httpOptions = {
			headers:new HttpHeaders({
			"Content-Type":"application/json",
			"token":this.login.getToken()
		})
		}
		return this.http.post<BackendMessage>("/api/shopping",item,httpOptions);	
		
	}
	removeItem(id:number) {
		const httpOptions = {
			headers:new HttpHeaders({
			"Content-Type":"application/json",
			"token":this.login.getToken()
		})
		}
		return this.http.delete<BackendMessage>("/api/shopping/"+id,httpOptions);			
	}
}
