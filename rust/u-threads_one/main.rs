use std::thread;
use std::time::Duration;

fn main() {
	thread::spawn(|| {
		for i in 1..10 {
			println!("Hi number {} from spawned thread!",i);
			thread::sleep(Duration::from_millis(500));
		}
	});
	
	for i in 1..5 {
		println!("Hi number {} from main thread",i);
		thread::sleep(Duration::from_millis(500));
	};
}