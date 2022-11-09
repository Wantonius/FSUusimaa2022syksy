import {Component,OnInit} from '@angular/core';
import {Contact} from '../models/contact.model';
import {ContactService} from '../services/contactservice.service';

@Component({
	selector:"contact-list",
	templateUrl:"./contactlist.component.html"
})
export class ContactList implements OnInit {
	
	
	contactList:Contact[] = [];
	constructor(private contactService:ContactService) {}
	
	ngOnInit(){
		this.getList();
	}
	
	getList() {
		this.contactList = this.contactService.getList();
	}
	
	removeContact(id:number) {
		this.contactService.removeContact(id);
		this.getList();
	}
}