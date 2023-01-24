import {useState,useEffect} from 'react';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginPage from './components/LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:""
	})

	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//USEEFFECT
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(urlRequest.url === "") {
				return;
			}
			let url = "https://average-sarong-slug.cyclic.app"+urlRequest.url
			const response = await fetch(url,urlRequest.request);
			if(!response) {
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":
						alert("Register success!")
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							return;
						}
						setState((state) => {
							return {
								...state,
								token:data.token,
								isLogged:true
							}
						})
						getList(data.token);
						return;
					case "logout":
						setState({
							list:[],
							isLogged:false,
							token:""
						})
						return;
					case "getlist":
						const list = await response.json()
						if(!list) {
							return;
						}
						setState((state) => {
							return {
								...state,
								list:list
							}
						})
						return;
					case "additem":
					case "removeitem":
						getList(state.token);
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					setState({
						list:[],
						isLogged:false,
						token:""
					})
				}
				if(urlRequest.action === "logout") {
					setState({
						list:[],
						isLogged:false,
						token:""
					})					
				}

			}
		}
		
		fetchData();
	},[urlRequest])
	
	//LOGIN API
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setUrlRequest({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})		
	}
	
	const logout = () => {
		setUrlRequest({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"token":state.token}
			},
			action:"logout"
		})
	}
	
	//SHOPPING API
	
	const getList = (token) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":token
				}
			},
			action:"getlist"
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				},
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
				headers:{
					"token":state.token
				}
			},
			action:"removeitem"
		})
	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
			{state.isLogged ? (
				<>
					<Stack.Screen name="ShoppingList">
					{props => <ShoppingList {...props} list={state.list} removeItem={removeItem} logout={logout}/>}
					</Stack.Screen>
					<Stack.Screen name="Add Item">
					{props => <ShoppingForm {...props} addToList={addToList}/>}
					</Stack.Screen>
				</>
			) : (
				<>
					<Stack.Screen name="Login">
					{props => <LoginPage {...props} login={login} register={register}/>}
					</Stack.Screen>
				</>
			)
			}
			</Stack.Navigator>
		</NavigationContainer>
	);
}


