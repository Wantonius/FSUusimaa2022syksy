use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
	println!("Guess the number!");
	
	let secret_number = rand::thread_rng().gen_range(1..101);
	let mut max_number = 100;
	let mut min_number = 1;
	
	loop {
		println!("Please guess a number between {} and {}",min_number,max_number);
		
		let mut guess = String::new();
		
		io::stdin().read_line(&mut guess).expect("Failed to read line");
		
		let guess:u32 = match guess.trim().parse() {
			Ok(num) => num,
			Err(msg) => {
				println!("{}",msg);
				continue;
			}
		};
		
		if guess < min_number {
			println!("Your guess was too small. Guess at least {}",min_number);
			continue;
		};
		
		if guess > max_number {
			println!("Your guess was too large. Guess no more than {}",max_number);
			continue;
		};
		
		println!("You guessed {}",guess);
	
		match guess.cmp(&secret_number) {
			Ordering::Less => {
				println!("Too small! Lowest you can now guess is {}",guess);
				min_number = guess;
			},
			Ordering::Greater => {
				println!("Too large! Highest you can now guess is {}",
				guess);
				max_number = guess;
			},
			Ordering::Equal => {
				println!("You win");
				break;
			},
		}
	}
}