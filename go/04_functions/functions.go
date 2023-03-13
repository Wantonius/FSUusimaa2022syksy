package main

import "fmt"

//Basic functions. Variable name before type in parameters and returh value last

func add(a int, b int) int {
	return a+b
}

func substract(a int, b int) int {
	return a-b
}

//multiple return values

func math_action(a int, b int, action string) (int,string) {
	if action == "add" {
		return a+b,"added"
	}
	if action == "substract" {
		return a-b,"substracted"
	}
	return 0,"unknown action"
}

//variadic functions

func sum(vals ...int) int {
	total := 0
	for _,num := range vals {
		total += num
	}
	return total
}

func main() {
	
	c := add(20,10)
	d := substract(20,10)
	
	fmt.Println("20+10 = ",c)
	fmt.Println("20-10 = ",d)
	
	e,act := math_action(20,10,"add")
	f,act2 := math_action(20,10,"substract")
	_,act3 := math_action(20,10,"divide")
	
	fmt.Printf("20 %s to 10 = %d\n",act,e)
	fmt.Printf("20 %s from 10 = %d\n",act2,f)
	fmt.Printf("%s\n",act3)
	
	t := []int{1,2,3,4,5,6,7,8,9}
	fmt.Println("Add together these numbers",t)
	fmt.Printf("Sum is %d\n",sum(t...))
}