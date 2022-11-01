import {useState} from 'react';
import useGame from '../hooks/useGame';

const StartPage = (props) => {
	
	const [state,setState] = useState({
		name:""
	})
	
	const {message,startGame} = useGame();
	
	const onChange = (event) => {
		setState({
			name:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		startGame(state.name);
	}
	
	return(
		<div style={{margin:"auto"}}>
			<form onSubmit={onSubmit}>
				<label htmlFor="name">Player Name</label>
				<input type="text"
						name="name"
						id="name"
						onChange={onChange}
						value={state.name}/>
				<br/>
				<input type="submit" value="Start game"/>			
			</form>
			<h3>{message}</h3>
		</div>
	)
}

export default StartPage;