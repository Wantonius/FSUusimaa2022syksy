package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
)

type Item struct {
	Id 		string	`json:"id"`
	Type	string	`json:"type"`
	Count	string	`json:"count"`
	Price	string	`json:"price"`
}

type BackendMessage struct {
	Message	string	`json:"message"`
}

func main() {

	shoppingItems := make([]Item,0)
	id := 100

	fs := http.FileServer(http.Dir("static/"))
	http.Handle("/",fs)
	
	http.HandleFunc("/api/shopping",func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
			case http.MethodGet:
				json.NewEncoder(w).Encode(shoppingItems)
			case http.MethodPost:
				var item Item
				json.NewDecoder(r.Body).Decode(&item)
				item.Id = strconv.FormatInt(int64(id),10)
				id++
				shoppingItems = append(shoppingItems,item)
				w.WriteHeader(http.StatusCreated)
				message := BackendMessage{Message:"Success"}
				json.NewEncoder(w).Encode(message)
			default:
				w.WriteHeader(http.StatusNotImplemented)
				message := BackendMessage{Message:"Unknown Command"}
				json.NewEncoder(w).Encode(message)
		}
	})
	
	http.HandleFunc("/api/shopping/",func(w http.ResponseWriter, r *http.Request) {
		temp_string := r.URL.String();
		temp_id := temp_string[len(temp_string)-3:]
		switch r.Method {
			case http.MethodDelete:
				for i,item := range shoppingItems {
					if item.Id == temp_id {
						shoppingItems = append(shoppingItems[:i],shoppingItems[i+1:]...)
					}
				}
				message := BackendMessage{Message:"Success"}
				json.NewEncoder(w).Encode(message)
			case http.MethodPut:
				var t_item Item;
				json.NewDecoder(r.Body).Decode(&t_item)
				t_item.Id = temp_id
				for i,item := range shoppingItems {
					if item.Id == temp_id {
						shoppingItems[i] = t_item
					}
				}
				message := BackendMessage{Message:"Success"}
				json.NewEncoder(w).Encode(message)
			default:
				w.WriteHeader(http.StatusNotImplemented)
				message := BackendMessage{Message:"Unknown Command"}
				json.NewEncoder(w).Encode(message)
		}
	})
	
	fmt.Println("Server is ready in port 3000")
	http.ListenAndServe(":3000",nil)
}