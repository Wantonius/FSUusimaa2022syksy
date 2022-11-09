import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ObservableService {
	
	obs = new Observable((observer) => {
		setTimeout(() => observer.next("1"),1000);
		setTimeout(() => observer.next("2"),2000);
		setTimeout(() => observer.next("3"),3000);
		setTimeout(() => observer.next("4"),4000);
		setTimeout(() => observer.next("5"),5000);
		setTimeout(() => observer.complete(),6000);
	})
	
	getObservable() {
		return this.obs;
	}
}