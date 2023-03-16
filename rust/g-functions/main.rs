fn print_country(country_name:String) {
	println!("{}",country_name);
}

fn print_country_returns_country(country_name:String) -> String {
	println!("{}", country_name);
	country_name //Return value when without a semi-colon
}

fn print_country_with_reference(country_name:&String) {
	println!("{}",country_name);
}

fn add_ruotsi(country_name: &mut String) {
	country_name.push_str("-Ruotsi");
	println!("Now it says: {}",country_name);
}
fn main() {
	let country = String::from("Suomi");
	print_country(country);
	//print_country(country);
	
	/*If we remove the comment the other print country line it will not work. Rust has a very specific ownership rules and transferring the variable to a function will move the ownership also. Also at the end of each block non-returned variables will be freed.
	*/
	let country = String::from("Suomi");
	let country = print_country_returns_country(country);
	print_country_returns_country(country);

	//This works but is unfeasible. We want to pass reference or "borrow" the variable

	let country = String::from("Suomi");
	print_country_with_reference(&country);
	print_country_with_reference(&country);

	//Passing a mutable reference
	
	let mut country = String::from("Suomi");
	add_ruotsi(&mut country);
}