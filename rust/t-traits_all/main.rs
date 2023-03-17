use std::fmt::Debug;

struct Monster {
	health: i32,
}
#[allow(dead_code)]
#[derive(Debug)]
struct Wizard {
	health:i32,
}
#[allow(dead_code)]
#[derive(Debug)]
struct Ranger {
	health:i32,
}

trait Magic {}
trait FightClose {}
trait FightFromDistance {}

impl FightClose for Ranger {}
impl FightClose for Wizard {}
impl FightFromDistance for Ranger {}
impl Magic for Wizard {}

fn attack_with_bow<T:FightFromDistance + Debug>(character: &T, opponent: &mut Monster, distance: u32) {
	if distance < 10 {
		opponent.health -= 10;
		println!("You attack with a bow. Your opponent has {} health left. You are at {:?}",opponent.health,character);
	}
}

fn fireball<T:Magic+Debug>(character:&T,opponent:&mut Monster,distance:u32) {
	if distance < 15 {
		opponent.health -= 20;
		println!("You blast your opponent with a fireball. Your opponent has {} health left. You are at {:?}",opponent.health,character)
	}
}

fn attack_with_sword<T:FightClose+Debug>(character:&T,opponent:&mut Monster) {
	opponent.health -= 10;
	println!("You hit the monster with your sword. Your opponent has {} health left. You are at {:?}",opponent.health,character);
}

fn main() {
	let gandalf = Wizard {health:100};
	let aragorn = Ranger {health:100};
	
	let mut orc = Monster{health:40};
	
	attack_with_sword(&gandalf,&mut orc);
	attack_with_bow(&aragorn,&mut orc,9);
	fireball(&gandalf,&mut orc,10);
}