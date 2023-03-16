fn main() {
	
	//Basic for loop
	
	for number in 0..3 {
		println!("The number is {}",number);
	}
	
	//For loop for equal
	
	for number in 0..=3 {
		println!("The number is {}",number);
	}
	
	let mut counter = 0;
	
	//Loop until you break. No condition on the loop
	
	loop {
		counter += 1;
		println!("Counter value:{}",counter);
		if counter == 5 {
			break;
		}
	}
	
	//Named loops. Create two nested loops and break from the inner one.
	
	let mut counter = 0;
	let mut counter2 = 0;
	println!("Now entering first loop");
	
	'first_loop: loop {
		counter += 1;
		println!("The first counter is now:{}",counter);
		if counter > 9 {
			println!("Entering inner loop");
			'inner_loop:loop {
				println!("The second counter is now:{}",counter2);
				counter2 += 1;
				if counter2 == 3 {
					break 'first_loop //Break out of first loop
				}
			}
		}
	}
	println!("After loops");

	//finally while loop
	let mut counter = 0;
	
	while counter < 5 {
		counter += 1;
		println!("While loop counter is {}",counter);
	}
}