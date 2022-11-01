import {useState} from 'react';
import useGame from '../hooks/useGame';

const GamePage = (props) => {

	const {message} = useGame();
	
	return (
		<h3>{message}</h3>
	)
}

export default GamePage;