import {useState,useEffect} from 'react';

const StatefulComponent = (props) => {
		
	const [state,setState] = useState({
		seconds:0
	});

	useEffect(() => {
		
		let interval = setInterval(() => {
			setState((state) => {
				return {
					seconds:state.seconds+1
				}
			})
		},1000);
		
		return () => clearInterval(interval);
		
	},[]);

	return(
		<h2>{state.seconds} seconds since you entered the page</h2>
	)
}

export default StatefulComponent;