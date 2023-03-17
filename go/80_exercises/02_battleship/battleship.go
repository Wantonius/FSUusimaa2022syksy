package main

import (
	"fmt"
	"os"
	"os/exec"
	"math/rand"
    "time"
)

// Here is one way of thinking about each coordinate in the game.

type location struct {
	ship bool
	hit bool
}

func drawBattleField(field [20][20]location) {
	
	//TO DO: Draw out the field with "." as normal cell, "o" as a cell that has been shot but has not hit a ship and "X" for hitting a ship.
	//So loop over the 2d array of the field and if field.hit == true then the fmt.Printf() value will be either "X" (if there is a ship) or "o" if no ship. 
	//Otherwise draw ".". Remember to call fmt.Printf("\n") between the inner and outer for-loop.
	//Multidimensional arrays in go: https://www.tutorialspoint.com/go/go_multi_dimensional_arrays.htm
}

//Windows only, google for linux. It is simpler.

func clearScreen() {
    cmd := exec.Command("cmd", "/c", "cls")
    cmd.Stdout = os.Stdout
    cmd.Run()
}



func initBattlefield(field [20][20]location) [20][20]location {
	
	
	//Initialize one 4 long ship, one 3 long ship and one 2 long ship. 
	//You can use rand.Intn(n) function to randomize. It gives you an int between 0->n
	//Get new seed first by calling rand.Seed(time.Now().UnixNano())
	
	
	//Randomize the locations of the ships and change the struct at that location of the 2d array marking the battlefield to {ship:true,hit:false}
	//Randomize the ships orientation if it is horizontal (along the x-axis) or vertical (along the y-axis)
	//Make sure that the ships do not collide or go out of the bounds of the battlefield. Borders of the field are solid.
	
}

func main() {
	var coord_x,coord_y,tries int
	hits := 9 //number of hits required to win the game. 4+3+2=9 so there are nine pieces of ship to hit. Game ends when player has hit all of them. 
	tries = 0 //this number goes up on each loop of the game engine. The lower the number, the better the score.
	var battlefield = [20][20]location{}

	//Init the battlefield and draw it for the first time
	//Then create a game loop where you ask the player to submit coordinates to shoot at. Loop terminates at hits == 0.
	//You can use fmt.Scanf("%d,%d",coord_x,coord_y) or bufio library if you prefer
	//Check that the input from the player is valid 
	//Then change the battlefield coordinates player gives so that hit is true. 
	//Check if there was a ship and substract one from hits variable if so.
	//Add to tries variable
	//Clear Screen
	//Draw the new battlefield
}