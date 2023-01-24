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
						return;
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
	
	const addToList = (item) => {

	}
	
	const removeItem = (id) => {

	}
	
	return (
		<NavigationContainer>
			<Stack.Navigator>
			{state.isLogged ? (
				<>
					<Stack.Screen name="ShoppingList">
					{props => <ShoppingList {...props} list={state.list} removeItem={removeItem}/>}
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


