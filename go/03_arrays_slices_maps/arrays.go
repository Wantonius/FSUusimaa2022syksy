package main

import "fmt"

func main() {
	
	//Introduce an array. It has a specific length and will be zero-valued
	
	var myArray [6]int
	
	fmt.Println("myArray:",myArray)
	fmt.Println("myArray length:",len(myArray))

	myArray[3] = 50
	fmt.Println("myArray again:",myArray)
	
	myInitializedArray := [3]int{0,1,2}

	fmt.Println("Initialized array",myInitializedArray);
	fmt.Println("-----Slices-----");

	//Introduce a slice. Slices are dynamic in length and support additional methods like append

	var mySlice []int //No memory allocated
	
	//mySlice[0] = 0 this will crash the program since slice has no allocated memory
	
	myAllocatedSlice := make([]int,10) //Allocates a 10 int size slice with zero values

	fmt.Println("mySlice",mySlice)
	fmt.Println("myAllocatedSlice",myAllocatedSlice)
	
	mySlice = append(mySlice,0)
	
	fmt.Println("mySlice again",mySlice)

	//Multiple append
	
	mySlice = append(mySlice,[]int{10,100}...)
	
	fmt.Println("mySlice again",mySlice)
	
	copiedSlice := make([]int,len(mySlice))
	
	copy(copiedSlice,mySlice)
	
	fmt.Println("Copied slice",copiedSlice)
	
	partialSlice := mySlice[1:3]
	
	fmt.Println("Partial slice",partialSlice)
	
	fmt.Println("----Maps----")
	
	//Maps are go's build-in associative data type, key-value paris or dictionaries. Use make to create empty maps

	intStringMap := make(map[int]string)
	stringIntMap := make(map[string]int)

	intStringMap[1] = "One"
	intStringMap[2] = "Two"

	stringIntMap["one"] = 1
	stringIntMap["two"] = 2

	fmt.Println("intStringMap",intStringMap)
	fmt.Println("stringIntMap",stringIntMap)
	fmt.Println("intStringMap value at 1",intStringMap[1])
	fmt.Println("stringIntMap value at one",stringIntMap["one"])

	//use delete to remove by key-value
	
	delete(stringIntMap,"two")
	fmt.Println("stringIntMap again",stringIntMap)

	//Check if key exists within map
	
	if val,ok := stringIntMap["one"]; ok {
		fmt.Printf("Map contains value %d\n",val)
	}
	
	if _,ok := stringIntMap["two"]; !ok {
		fmt.Println("Map does not contain that key-value pair")
	}
}