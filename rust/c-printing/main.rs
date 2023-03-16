fn main() {
	println!("Smallest i8 is {} the biggest i8 is {}",i8::MIN,i8::MAX);
	println!("Smallest u8 is {} the biggest u8 is {}",u8::MIN,u8::MAX);
	println!("Smallest i16 is {} the biggest i16 is {}",i16::MIN,i16::MAX);
	println!("Smallest u16 is {} the biggest u16 is {}",u16::MIN,u16::MAX);
	println!("Smallest i32 is {} the biggest i32 is {}",i32::MIN,i32::MAX);
	println!("Smallest u32 is {} the biggest u32 is {}",u32::MIN,u32::MAX);
	println!("Smallest i64 is {} the biggest i64 is {}",i64::MIN,i64::MAX);
	println!("Smallest u64 is {} the biggest u64 is {}",u64::MIN,u64::MAX);
	println!("Smallest i128 is {} the biggest i128 is {}",i128::MIN,i128::MAX);
	println!("Smallest u128 is {} the biggest u128 is {}",u128::MIN,u128::MAX);	

	let debug_print = ();
	println!("This will not print with normal brackets:{:?}",debug_print);
	
	let father_name = "Matti";
	let son_name = "Otto";
	let family_name = "Meikäläinen";
	
	println!("This is {1} {2}, son of {0} {2}.",father_name,son_name,family_name);
	
	println!("{city1} is in {country} and {city2} is also in {country}, but {city3} is not in {country}.",
		city1="Helsinki",
		city2="Tampere",
		city3="Tukholma",
		country="Suomi"
	);
}