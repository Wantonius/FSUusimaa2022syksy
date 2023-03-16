fn main() {
	let x = 5;
	println!("The value of x is: {x}");
	//x = 6;
	//Remove comment from the last line to see immutability in action.
	println!("The value of x is: {x}");
	
	let mut y=10;
	println!("The value of y is: {y}");
	y=20;
	println!("The value of y is: {y}");

	//Shadowing a variable with an inner scope
	
	let z = 5;
	
	let z = z + 1;
	{
		let z = z * 2;
		println!("Value of z in the inner scope is:{z}");
		
	}
	println!("The value of z is:{z}");
}