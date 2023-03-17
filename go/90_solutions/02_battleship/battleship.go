package main

import (
	"fmt"
	"os"
	"os/exec"
	"math/rand"
    "time"
)

type location struct {
	ship bool
	hit bool
}

func drawBattleField(field [20][20]location) {
	
	var i,j int;
	for i=0;i<20;i++ {
		for j=0;j<20;j++ {
			if field[i][j].hit {
				if field[i][j].ship == true {
					fmt.Printf("X")
				} else {
					fmt.Printf("o")
				}				
			} else {
				fmt.Printf(".")
			}
		}
		fmt.Println("")
	}

}

//windows only

func clearScreen() {
    cmd := exec.Command("cmd", "/c", "cls")
    cmd.Stdout = os.Stdout
    cmd.Run()
}

func initBattlefield(field [20][20]location) [20][20]location {
	
	rand.Seed(time.Now().UnixNano())
	var i,x,y,percent int
	horizontal := true
	clashes := true

	//init 4-ship
	
	percent = rand.Intn(100)
	if percent < 51 {
		horizontal = false
	}
	if horizontal {
		x = rand.Intn(15)
		y = rand.Intn(19)
	} else {
		x = rand.Intn(19)
		y = rand.Intn(15)
	}
	for i=0;i<4;i++ {
		field[x][y] = location{ship:true,hit:false}
		if horizontal {
			x++
		} else {
			y++
		}		
	}
	//init 3-ship
	percent = rand.Intn(100)
	if percent < 51 {
		horizontal = false
	} else {
		horizontal = true
	}
	for clashes {
		if horizontal {
			x = rand.Intn(16)
			y = rand.Intn(19)
			var temp = field[x][y].ship
			var temp2 = field[x+1][y].ship
			var temp3 = field[x+2][y].ship
			if !temp && !temp2 && !temp3 {
				clashes = false
			}
		} else {
			x = rand.Intn(19)
			y = rand.Intn(16)
			temp := field[x][y].ship
			temp2 := field[x][y+1].ship
			temp3 := field[x][y+2].ship
			if !temp && !temp2 && !temp3 {
				clashes = false
			}
		}
	}
	for i=0;i<3;i++ {
		field[x][y] = location{ship:true,hit:false}
		if horizontal {
			x++
		} else {
			y++
		}		
	}

	//init 2-ship
	percent = rand.Intn(100)
	if percent < 51 {
		horizontal = false
	} else {
		horizontal = true
	}
	for clashes {
		if horizontal {
			x = rand.Intn(17)
			y = rand.Intn(19)
			var temp = field[x][y].ship
			var temp2 = field[x+1][y].ship
			if !temp && !temp2 {
				clashes = false
			}
		} else {
			x = rand.Intn(19)
			y = rand.Intn(17)
			temp := field[x][y].ship
			temp2 := field[x][y+1].ship
			if !temp && !temp2 {
				clashes = false
			}
		}
	}
	for i=0;i<2;i++ {
		field[x][y] = location{ship:true,hit:false}
		if horizontal {
			x++
		} else {
			y++
		}		
	}	

	return field;
}

func main() {
	var coord_x,coord_y,tries int
	hits := 9
	tries = 0
	var battlefield = [20][20]location{}
	battlefield = initBattlefield(battlefield)
	drawBattleField(battlefield)
	for hits > 0 {
		fmt.Println("Please enter your attack coordinates x,y")
		_, err := fmt.Scanf("%d,%d",&coord_x,&coord_y)
		if(err != nil) {
			continue
		}
		if coord_x > 19 || coord_y > 19 {
			continue
		}
		if coord_x == -1 {
			os.Exit(3)
		}
		battlefield[coord_y][coord_x].hit = true;
		if battlefield[coord_y][coord_x].ship {
			hits--
		}
		tries++
		clearScreen()
		drawBattleField(battlefield)
		fmt.Printf("Hits left to win:%d\n",hits)
		fmt.Printf("You have shot %d times.\n",tries)
	}	
	fmt.Println("Congrats you won in %d tries",tries)
}
