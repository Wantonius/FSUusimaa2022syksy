package main

import (
	"fmt"
	"time"
)

func worker(done chan bool) {
	fmt.Println("Worker: Lets do some work!")
	time.Sleep(3*time.Second)
	fmt.Println("Worker: And we are done")
	fmt.Println("Worker: Send done signal to main")
	done <- true
}

func main() {

	messages := make(chan string)
	
	//Create a channel with make(chal val-type). Channels are typed by the value. Both send and receive block until both are ready

	fmt.Println("-----Basic Channel-----")
	
	go func() {
		fmt.Println("Pinger: Pinging the main")
		messages <- "Ping"
	}()

	fmt.Println("Main: Waiting for a ping")
	msg := <- messages
	fmt.Printf("%s\n",msg)
	
	time.Sleep(2*time.Second)
	
	fmt.Println("-----Buffered Channel-----")
	
	buffered := make(chan string,2)
	
	buffered <- "buffered"
	buffered <- "channel"
	
	fmt.Println(<-buffered)
	fmt.Println(<-buffered)
	time.Sleep(2*time.Second)

	//Lets use channels to synchro execution across goroutines
	
	done := make(chan bool,1)
	go worker(done)
	fmt.Println("Main: Waiting for the worker to complete")
	<-done
	fmt.Println("Main: Worker done. Exiting")
}