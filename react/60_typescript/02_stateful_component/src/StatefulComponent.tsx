import React,{useState,useEffect} from 'react';

interface State {
	seconds:number
}

const StatefulComponent:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		seconds:0
	})

	const startTimer = ():void => {
		setState((state) => {
			return {
				seconds:state.seconds+1
			}
		})
	}
	
	useEffect(() => {
		let interval = setInterval(startTimer,1000);
		
		return () => clearInterval(interval);
	},[])
	
	return (
		<h2>{state.seconds} seconds since you entered the page</h2>
	)
}

export default StatefulComponent