import {useState,useEffect} from 'react';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const stateSelector = state => state
	
	const appState = useSelector(stateSelector);
	
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
				//getList(state.token);
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
					case "register":
						setError("Register success!");
						return;
					case "login":
						let loginData = await response.json();
						if(loginData) {
							setState((state) => {
								let tempState = {
									...state,
									isLogged:true,
									token:loginData.token
								}
								saveToStorage(tempState);
								return tempState;
							})
							getList(loginData.token);
						}
						return;
					case "logout":
						clearState();
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
					case "register":
						if(response.status === 409) {
							setError("Username already in use");
							return;
						}
						setError("Error when registering. Server responded with a status "+response.status+" "+response.statusText)
						return;
					case "login":
						setError("Error logging in. Server responded with a status "+response.status+" "+response.statusText);
						return;
					case "logout":
						clearState();
						setError("Server responded with an error. Logging you out!");
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//LOGIN API
	

	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":state.token}
			},
			action:"logout"
		})
	}
	
	//SHOPPING API
	
	const getList = (token = state.token,search) => {
		let url = "/api/shopping"
		if(search) {
		   url = "/api/shopping"+search
		}
		setUrlRequest({
			url:url,
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
						"token":token}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
						"token":state.token},
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
				headers:{"Content-Type":"application/json",
						"token":state.token}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
						"token":state.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(appState.loading) {
		messageArea = <h4>Loading...</h4>
	}
	if(appState.error) {
		messageArea = <h4>{state.error}</h4>
	}
	let routes = <Routes>
				<Route exact path="/" element={<LoginPage />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
	if(appState.isLogged) {
		routes = <Routes>
				<Route exact path="/" element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem} getList={getList} token={state.token}/>}/>
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar logout={logout} isLogged={state.isLogged}/>
			{messageArea}
			<hr/>
			{routes}
		</div>
	);
}

export default App;
