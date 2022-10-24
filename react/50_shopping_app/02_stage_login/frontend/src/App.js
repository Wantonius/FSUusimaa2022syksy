import {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	useEffect(() => {
		getList();
	},[]);
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			const response = await fetch(urlRequest.url,urlRequest.request);
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
							setState({
								list:data
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
				switch(urlRequest.action) {
					case "additem":
						console.log("Error in adding new item. Server responded with a status",response.status,response.statusText);
						return;
					case "getlist":
						console.log("Error in fetching data. Server responded with a status",response.status,response.statusText)
						return;
					case "removeitem":
						console.log("Error in removing item. Server responded with a status",response.status,response.statusText)
						return;
					case "edititem":
						console.log("Error in editing item. Server responded with a status",response.status,response.statusText)
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
