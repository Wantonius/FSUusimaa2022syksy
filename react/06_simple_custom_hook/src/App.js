import logo from './logo.svg';
import './App.css';
import useCount from './hooks/useCount';

function App() {
	
	const [value,add,substract] = useCount(10);
  
	return (
		<div className="App">	
			<h2>Count:{value}</h2>
			<button onClick={add}>+</button>
			<button onClick={substract}>-</button>
		</div>
	);
}

export default App;
