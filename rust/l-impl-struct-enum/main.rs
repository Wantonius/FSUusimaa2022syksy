#[derive(Debug)]
enum AnimalType {
	Cat,
	Dog,
}

#[derive(Debug)]
struct Animal {
	age:u8,
	animal_type:AnimalType
}

impl Animal {
	//Implementation often has new()-function. This creates an instance
	fn new(age:u8,animal_type:AnimalType) -> Self {
		Self {
			age:age,
			animal_type:animal_type
		}
	}
	
	fn change_to_dog(&mut self) {
		println!("Changing to dog!");
		self.animal_type = AnimalType::Dog;
	}
	
	fn change_to_cat(&mut self) {
		println!("Changing to cat!");
		self.animal_type = AnimalType::Cat;
	}
	
	fn check_type(&self) {
		match self.animal_type {
			AnimalType::Dog => println!("This animal is a dog"),
			AnimalType::Cat => println!("This animal is a cat"),
		}
	}
}

fn main() {
	let mut new_cat = Animal::new(5,AnimalType::Cat);
	let mut new_dog = Animal::new(7,AnimalType::Dog);
	println!("This animal is {} years old",new_cat.age);
	println!("This animal is {} years old",new_dog.age);

	new_cat.check_type(); //No need to pass the self because Animal has implemented the functions.
	new_cat.change_to_dog();
	new_cat.check_type();
	
	new_dog.check_type();
	new_dog.change_to_cat();
	new_dog.check_type();
}