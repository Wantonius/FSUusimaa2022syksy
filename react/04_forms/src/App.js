import {useState} from 'react';
import NameForm from './NameForm';
import './App.css';

function App() {
	
	const [state,setState] = useState({
		greeting:"No greeting yet"
	})
	
	const setGreeting = (name) => {
		setState({
			greeting:"Hello "+name
		})
	}
	
	return (
		<div className="App">
			<NameForm setGreeting={setGreeting}/>
			<hr/>
			<h2>{state.greeting}</h2>
		</div>
  );
}

export default App;
