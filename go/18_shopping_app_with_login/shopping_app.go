package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
	"math/rand"
	"time"
)

//Databases and constants

const time_to_live = 3600
var shoppingItems []Item
var registeredUsers []User
var loggedSessions []Session
var letters = []rune("abcdefghirofuAFEDSTRHN")
var id int
type Middleware func(http.HandlerFunc) http.HandlerFunc

//Types

type Item struct {
	Id		string	`json:"id"`
	Type	string	`json:"type"`
	Count	string	`json:"count"`
	Price	string	`json:"price"`
}

type User struct {
	Username	string	`json:"username"`
	Password	string	`json:"password"`
}

type Session struct {
	TTL		int64		`json:"ttl"`
	Token	string		`json:"token"`
}

type Token struct {
	Token	string		`json:"token"`
}

type BackendMessage struct {
	Message string 		`json:"message"`
}

//Helper functions and Middleware

func createToken() string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune,128)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
	for _,m := range middlewares {
		f = m(f)
	}
	return f
}

func isUserLogged() Middleware {
	return func(f http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			token := r.Header.Get("token")
			if token == "" {
				w.WriteHeader(http.StatusForbidden)
				message := BackendMessage{Message:"Forbidden"}
				json.NewEncoder(w).Encode(message)
				return
			}
			for i,session := range loggedSessions {
				if(token == session.Token) {
					now := time.Now().Unix()
					if(now > session.TTL) {
						loggedSessions = append(loggedSessions[:i],loggedSessions[i+1:]...)
						w.WriteHeader(http.StatusForbidden)
						message := BackendMessage{Message:"Forbidden"}
						json.NewEncoder(w).Encode(message)
						return
					} else {
						session.TTL = now + time_to_live
						f(w,r)
						return
					}
				}
			}
			w.WriteHeader(http.StatusForbidden)
			message := BackendMessage{Message:"Forbidden"}
			json.NewEncoder(w).Encode(message)
			return
		}
	}
}

//REST API

func handleGetAndPost(w http.ResponseWriter, r *http.Request) {
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
}

func handleDeleteAndPut(w http.ResponseWriter, r *http.Request) {
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
}

//LOGIN API

func register(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User
			json.NewDecoder(r.Body).Decode(&user)
			for _,u := range registeredUsers {
				if(user.Username == u.Username) {
					w.WriteHeader(http.StatusConflict)
					message := BackendMessage{Message:"Username already in use"}
					json.NewEncoder(w).Encode(message)
					return
				}
			}
			registeredUsers = append(registeredUsers,user)
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusNotImplemented)
			message := BackendMessage{Message:"Unknown command"}
			json.NewEncoder(w).Encode(message)
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
		case http.MethodPost:
			var user User
			json.NewDecoder(r.Body).Decode(&user)
			for _,u := range registeredUsers {
				if(u.Username == user.Username) {
					if(u.Password == user.Password) {
						ttl := time.Now().Unix() + time_to_live
						t := createToken()
						loggedSessions =append(loggedSessions,Session{TTL:ttl,Token:t})
						data := Token{Token:t}
						json.NewEncoder(w).Encode(data)
						return
					} else {
						w.WriteHeader(http.StatusUnauthorized)
						message := BackendMessage{Message:"Unauthorized"}
						json.NewEncoder(w).Encode(message)
						return
					}
				}
			}
			w.WriteHeader(http.StatusUnauthorized)
			message := BackendMessage{Message:"Unauthorized"}
			json.NewEncoder(w).Encode(message)
		default:
			w.WriteHeader(http.StatusNotImplemented)
			message := BackendMessage{Message:"Unknown command"}
			json.NewEncoder(w).Encode(message)
	}
}

func logout(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get("token")
	for i,s := range loggedSessions {
		if(token == s.Token) {
			loggedSessions = append(loggedSessions[:i],loggedSessions[i+1:]...)
			message := BackendMessage{Message:"Success"}
			json.NewEncoder(w).Encode(message)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
	message := BackendMessage{Message:"Not found"}
	json.NewEncoder(w).Encode(message)
}

func main() {
	
	shoppingItems = make([]Item,0)
	registeredUsers = make([]User,0)
	loggedSessions = make([]Session,0)
	id = 100
	
	fs := http.FileServer(http.Dir("static/"))
	http.Handle("/",fs)
	
	http.HandleFunc("/api/shopping",Chain(handleGetAndPost,isUserLogged()))
	http.HandleFunc("/api/shopping/",Chain(handleDeleteAndPut,isUserLogged()))
	http.HandleFunc("/register",register)
	http.HandleFunc("/login",login)
	http.HandleFunc("/logout",logout)
	
	fmt.Println("Server is running in port 3000")
	http.ListenAndServe(":3000",nil)
}