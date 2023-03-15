package main

import (
	"html/template"
	"net/http"
)

type Item struct {
	Type	string
	Count	int
	Price	int
}

type ShoppingData struct {
	ShoppingList string
	Items		[]Item
}

func main() {
	t := template.Must(template.ParseFiles("./views/layout.html"))
	http.HandleFunc("/",func(w http.ResponseWriter, r *http.Request) {
		data := ShoppingData{
			ShoppingList:"My List",			Items:[]Item{{Type:"Banana",Count:5,Price:5},{Type:"Apple",Count:10,Price:10},{Type:"Beer",Count:2,Price:4}},
		}
		t.Execute(w,data)
	})
	http.ListenAndServe(":3000",nil)
}