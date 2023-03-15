package main

import (
	"net/http"
	"fmt"
	"encoding/json"
)

type Contact struct {
	FirstName	string	`json:"firstname"`
	LastName 	string	`json:"lastname"`
	Email		string	`json:"email"`
	Phone		string	`json:"phone"` 
}

type BackendMessage struct {
	Message		string	`json:"message"`
}

func main() {

	contactList := make([]Contact,0)
	
	http.HandleFunc("/contacts", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
			case http.MethodGet:
				json.NewEncoder(w).Encode(contactList)
			case http.MethodPost:
				var contact Contact
				json.NewDecoder(r.Body).Decode(&contact)
				contactList = append(contactList,contact)
				w.WriteHeader(http.StatusCreated)
				message := BackendMessage{Message:"Success"}
				json.NewEncoder(w).Encode(message)
			default:
				message := BackendMessage{Message:"Unknown command"}
				w.WriteHeader(http.StatusNotImplemented)
				json.NewEncoder(w).Encode(message)
		}
	})
	
	fmt.Println("Server is running in port 3000")
	http.ListenAndServe(":3000",nil)
}