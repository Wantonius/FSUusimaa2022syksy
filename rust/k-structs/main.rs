//Structs can be tuple structs
#[derive(Debug)]
struct Color(u8,u8,u8);

//Named struct
struct SizeAndColor {
	size:u32,
	color:Color
}

fn main() {
	let my_color = Color(50,0,50);
	
	let size_and_color = SizeAndColor {
		size:150,
		color:my_color
	};
	
	println!("Size is {} and color is {:?}",size_and_color.size,size_and_color.color);
}