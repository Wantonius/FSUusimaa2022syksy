import {useState} from 'react';
import GameContext from './GameContext';
import {useNavigate} from 'react-router-dom';

const GameProvider = (props) => {
	
	const [state,setState] = useState({
		targetNumber:0,
		playerName:"",
		noOfGuesses:0,
		maximumGuess:100,
		minimumGuess:1,
		message:""
	})
	
	const navigate = useNavigate();
	
	const startGame = (name) => {
		if(!name) {
			setState((state) => {
				return {
					...state,
					message:"Please enter a name"
				}
			})
			return;
		}
		const target = Math.floor(Math.random()*100)+1;
		const message = "Hello, "+name+". Guess a number between "+state.minimumGuess+" and "+state.maximumGuess
		setState((state) => {
			return {
				...state,
				playerName:name,
				targetNumber:target,
				message:message
			}
		})
		navigate("/game");
	}
	
	return(
		<GameContext.Provider value={{
			playerName:state.playerName,
			message:state.message,
			startGame:startGame
		}}>
			{props.children}
		</GameContext.Provider>
	)
}

export default GameProvider;