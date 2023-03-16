//We create enum with two options
enum ThingsInTheSky {
	Sun,
	Stars,
}

//Create the things in the sky based on time
fn create_sky(time:i32) -> ThingsInTheSky {
	match time {
		6..=18 => ThingsInTheSky::Sun,
		_ => ThingsInTheSky::Stars
	}
}

fn whats_on_sky(state: &ThingsInTheSky) {
	match state {
		ThingsInTheSky::Sun => println!("I can see the sun!"),
		ThingsInTheSky::Stars => println!("Stars are right!"),
	}
}

fn main() {
	let time = 8;
	let sky = create_sky(time);
	whats_on_sky(&sky);
	
	let time2 = 22;
	let sky2 = create_sky(time2);
	whats_on_sky(&sky2);	
}