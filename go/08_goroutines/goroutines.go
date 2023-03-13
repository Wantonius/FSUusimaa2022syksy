package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("Hello goroutine")
}

func numbers() {
	for i := 1;i<=5;i++ {
		time.Sleep(250*time.Millisecond)
		fmt.Printf("%d ",i)
	}
	fmt.Printf("Numbers thread terminates ")
}

func letters() {
	for i := 'a'; i <= 'e';i++ {
		time.Sleep(400*time.Millisecond)
		fmt.Printf("%c ",i)
	}
	fmt.Printf("Letters thread terminates ")
}

func main() {
	fmt.Println("Hello world!")
	go hello()
	time.Sleep(time.Second)
	
	fmt.Println("In main function")
	
	go numbers()
	go letters()
	time.Sleep(3*time.Second)
	fmt.Println("... main ends")
}