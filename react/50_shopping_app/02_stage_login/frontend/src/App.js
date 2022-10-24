import {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[],
		token:"",
		isLogged:false,
		error:"",
		loading:false
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//STORAGE FUNCTIONS
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			if(state.isLogged) {
				getList(state.token);
			}
			setState(state);
		}
	},[]);
	
	//STATE FUNCTION
	
	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				loading:false,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				error:""
			}
		})
	}
	
	const clearState = () => {
		let state = {
			list:[],
			loading:false,
			error:"",
			token:"",
			isLogged:false
		}
		saveToStorage(state);
		setState(state);
	}
	
	//FETCH
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(!response) {
				console.log("Error fetching!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "additem":
						getList();
						return;
					case "getlist":
						let data = await response.json();
						if(data) {
							setState((state) => {
								let tempState = {
									...state,
									list:data
								}
								saveToStorage(tempState);
								return tempState;
							})
						}
						return;
					case "removeitem":
						getList();
						return;
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					clearState();
					setError("Your session has expired. Please login again!");
					return;
				}
				switch(urlRequest.action) {
					case "additem":
						setError("Error in adding new item. Server responded with a status"+response.status+" "+response.statusText);
						return;
					case "getlist":
						setError("Error in fetching data. Server responded with a status"+response.status+" "+response.statusText)
						return;
					case "removeitem":
						setError("Error in removing item. Server responded with a status"+response.status+" "+response.statusText)
						return;
					case "edititem":
						setError("Error in editing item. Server responded with a status"+response.status+" "+response.statusText)
						return;							
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json"}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json"}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route exact path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
			</Routes>
		</div>
	);
}

export default App;
