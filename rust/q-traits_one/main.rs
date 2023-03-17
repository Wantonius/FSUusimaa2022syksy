struct Animal {
	name:	String,	//Define a simple struct with one variable
}

trait Dog {
	fn bark(&self) {
		println!("Woof Woof!");
	}
	
	fn run(&self) {
		println!("The dog is running");
	}
}

impl Dog for Animal {}

fn main() {
	let rover = Animal {
		name:"Rover".to_string(),
	};
	
	rover.bark();
	rover.run();
}