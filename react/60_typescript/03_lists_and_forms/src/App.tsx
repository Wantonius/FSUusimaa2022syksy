import React,{useState} from 'react';
import ShoppingItem from './models/ShoppingItem';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import './App.css';

interface State {
	list:ShoppingItem[];
	id:number;
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	})
	
	const addItem = (item:ShoppingItem) => {
		setState((state) => {
			item.id = state.id;
			let tempList = state.list.concat(item);
			return {
				list:tempList,
				id:state.id+1
			}
		})
	}
	
	const removeItem = (id:number) => {
		setState((state) => {
			let tempList = state.list.filter(item => item.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addItem={addItem}/>
			<hr/>
			<ShoppingList removeItem={removeItem} list={state.list}/>
		</div>
	);
}

export default App;
