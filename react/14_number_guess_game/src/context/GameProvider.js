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
	
	const guess = (guess) => {	
		if(state.targetNumber === 0) {
			setState({
				targetNumber:0,
				playerName:"",
				noOfGuesses:0,
				maximumGuess:100,
				minimumGuess:1,
				message:""				
			})
			navigate("/");
			return;
		}
		if(isNaN(guess)) {
			setState((state) => {
				let message = "Enter a NUMBER between "+state.minimumGuess+" and "+state.maximumGuess
				return {
					...state,
					message:message
				}
			})
			return;
		}
		let tempGuess = parseInt(guess)
		if(tempGuess < state.minimumGuess || tempGuess > state.maximumGuess) {
			setState((state) => {
				let message = "Enter a number between "+state.minimumGuess+" and "+state.maximumGuess
				return {
					...state,
					message:message
				}
			})
			return;
		}
		if(tempGuess < state.targetNumber && tempGuess >= state.minimumGuess) {
			setState((state) => {
				let message = "Your guess was too low. Guess again between "+guess+" and "+state.maximumGuess
				return {
					...state,
					noOfGuesses:state.noOfGuesses+1,
					minimumGuess:guess,
					message:message
				}
			})
			return;
		}
		if(tempGuess > state.targetNumber && tempGuess <= state.maximumGuess) {
			setState((state) => {
				let message = "Your guess was too high. Guess again between "+state.minimumGuess+" and "+guess
				return {
					...state,
					noOfGuesses:state.noOfGuesses+1,
					maximumGuess:guess,
					message:message
				}
			})		
			return;	
		}
		
		if(tempGuess === state.targetNumber) {
			let noOfGuesses = state.noOfGuesses + 1;
			alert("Congrats "+state.playerName+". You won with "+noOfGuesses+" guesses");
			setState({
				targetNumber:0,
				playerName:"",
				noOfGuesses:0,
				maximumGuess:100,
				minimumGuess:1,
				message:""				
			})
			navigate("/");
		}
	}
	
	return(
		<GameContext.Provider value={{
			playerName:state.playerName,
			message:state.message,
			startGame:startGame,
			guess:guess
		}}>
			{props.children}
		</GameContext.Provider>
	)
}

export default GameProvider;