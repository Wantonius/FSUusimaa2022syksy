use std::fmt::Debug;
#[allow(dead_code)]

#[derive(Debug)]
struct Animal {
	name:String,
	age:u8
}

fn print_item<T:Debug>(item:T) {
	println!("Here is your item: {:?}",item)
}

fn main() {
	let woofie = Animal {
		name:"Woofie".to_string(),
		age:2,
	};
	
	let number = 55;
	let name = "Jaska";
	
	print_item(woofie);
	print_item(number);
	print_item(name);
}
