import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {AppState} from './types/states';
import {getList} from './actions/shoppingActions';
import {useDispatch} from 'react-redux';
function App() {
	
	const stateSelector = (state:AppState) => state;
	
	const dispatch = useDispatch();
	
	const state = useSelector(stateSelector);
	
	useEffect(() => {
		if(state.login.isLogged) {
			dispatch(getList(state.login.token));
		}
	},[state.login.isLogged])
	
	if(state.login.isLogged) {
		return(
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" element={<ShoppingList/>}/>
				<Route path="/form" element={<ShoppingForm/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
		)
	} else {
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route path="/" element={<LoginPage/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</div>
	);
	}
}

export default App;
