package main

import (
    "fmt"
    "math"
)

type geometry interface {
    area() float64
    perim() float64
}

type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}

func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

func storeCircle(c circle, store []circle) []circle {
	return append(store,c)
}

func storeRect(r rect, store []rect) []rect {	
	return append(store,r)
}

func removeCircle(index int, store []circle) []circle {
	return append(store[:index],store[index+1:]...)
}

func removeRect(index int, store []rect) []rect {
	return append(store[:index],store[index+1:]...)
}

func measure(index int,g geometry) {
    fmt.Printf("At index %d\n",index)
    fmt.Printf("Area:%f\n",g.area())
    fmt.Printf("Perimeter:%f\n",g.perim())
}

func main() {
	
	var choice,index int
	var tempF float64
	var rectStore []rect
	var circleStore []circle
	
	fmt.Println("Welcome to geometry store where we store and retrieve geometrics")
	for  {
		fmt.Println("Choose one:")
		fmt.Println("1. Add new rectangle")
		fmt.Println("2. Add new circle")
		fmt.Println("3. Display rectangles")
		fmt.Println("4. Display circles")
		fmt.Println("5. Delete rectangle by index")
		fmt.Println("6. Delete circle by index")
		fmt.Println("7: Quit")
		fmt.Scanf("%d\r\n",&choice)
		switch choice {
			case 1:
				temp := rect{}
				fmt.Println("Enter the height of the rectangle")
				fmt.Scanf("%f\n",&tempF)
				temp.height = tempF
				fmt.Println("Enter the width of the rectangle")
				fmt.Scanf("%f\n",&tempF)
				temp.width = tempF
				rectStore = storeRect(temp,rectStore);
			case 2: 
				fmt.Println("Enter the radius of the circle")
				fmt.Scanf("%f\n",&tempF)
				temp := circle{radius:tempF}
				circleStore = storeCircle(temp,circleStore);				
			case 3:
				for i,r := range rectStore {
					measure(i,r)		
				}
			case 4: 
				for i,r := range circleStore {
					measure(i,r)		
				}
			case 5:
				fmt.Println("Enter the index for the rectangle to be removed")
				fmt.Scanf("%d\n",&index);
				rectStore = removeRect(index,rectStore)
				
			case 6:
				fmt.Println("Enter the index for the circle to be removed")
				fmt.Scanf("%d\n",&index);
				circleStore = removeCircle(index,circleStore)
			case 7:
				return
			default:
				continue
		}
	}
}

