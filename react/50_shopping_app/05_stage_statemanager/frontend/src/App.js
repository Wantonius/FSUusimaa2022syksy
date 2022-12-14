import {useEffect} from 'react';
import useAppState from './hooks/useAppState';
import useAction from './hooks/useAction';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
	
	const {isLogged,error,loading} = useAppState();
	const {getList} = useAction();
	
	useEffect(() => {
		if(isLogged) {
			getList();
		}
	},[isLogged])
	
	//CONDITIONAL RENDERING
	
	let messageArea = <h4> </h4>
	if(loading) {
		messageArea = <h4>Loading...</h4>
	}
	if(error) {
		messageArea = <h4>{error}</h4>
	}
	let routes = <Routes>
				<Route exact path="/" element={<LoginPage/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
	if(isLogged) {
		routes = <Routes>
				<Route exact path="/" element={<ShoppingList/>}/>
				<Route path="/form" element={<ShoppingForm/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
	}
	return (
		<div className="App">
			<Navbar/>
			{messageArea}
			<hr/>
			{routes}
		</div>
	);
}

export default App;
