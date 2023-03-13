package main

import (
	"fmt"
	"time"
)

func worker(ch chan string, s time.Duration) {
	time.Sleep(s * time.Millisecond)
	ch <- "worker done"
}

func main() {

	channel := make(chan string)
	channel2 := make(chan string)
	go worker(channel,6500)
	go worker(channel2,3500)
	
	//Select waits for multiple channels and works like switch-case. Default case is for situations where no of the sources have input available. Also used for non-blocking operations
	L:
	for {
		time.Sleep(time.Second)
		select {
			case v:= <-channel:
				fmt.Println("Worker 1 says",v)
				break L
			case v:= <-channel2:
				fmt.Println("Worker 2 says",v)
			default:
				fmt.Println("No input yet")
		}
	}
	close(channel)
	close(channel2)
	fmt.Println("Closing channels")
	
	jobs := make(chan int,5)
	done := make(chan bool)
	
	go func() {
		for {
			fmt.Println("Worker: Waiting for jobs")
			//Channels have an additional return value which returns true if the channel is open and false when channel is closed
			j,more := <- jobs
			if more {
				fmt.Println("Worker: Received a job",j)
			} else {
				fmt.Println("Worker: Received all jobs")
				done <- true
				return
			}	
		}
	}()
	
	for j := 1; j <= 3;j++ {
		fmt.Println("Main: sending another job")
		jobs <- j
		fmt.Println("Main: job sent")
		time.Sleep(time.Second)
	}
	close(jobs)
	fmt.Println("Main:Sent all jobs and closed channel")
	<-done
	fmt.Println("Main: Worker is done with jobs")
	
	fmt.Println("----Ranging over buffered channels----")
	
	queue := make(chan string,2)
	queue <- "one"
	queue <- "two"
	close(queue)
	
	fmt.Println("Closed buffered channel queue")
	
	for elem := range queue {
		fmt.Printf("Received element %s from a closed channel queue\n",elem)
	}
}