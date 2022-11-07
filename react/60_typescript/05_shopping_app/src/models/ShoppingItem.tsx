export default class ShoppingItem {

	id:number = 0;
	type:string = "";
	count:number = 0;
	price:number = 0;
	
	constructor(type:string,count:number,price:number,id:number) {
		this.id = id;
		this.type = type;
		this.count = count;
		this.price = price;
	}
	
}
