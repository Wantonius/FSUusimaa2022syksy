import {Injectable} from '@angular/core';
import {Contact} from '../models/contact.model';

@Injectable()
export class ContactService {
	
	private contactList:Contact[] = [];
	private id:number = 100;
	
	getList() {
		return this.contactList;
	}
	
	addContact(contact:Contact) {
		contact.id = this.id;
		this.id++;
		this.contactList.push(contact);
	}
	
	removeContact(id:number) {
		let tempList = this.contactList.filter(contact => id !== contact.id)
		this.contactList = tempList;
	}
}