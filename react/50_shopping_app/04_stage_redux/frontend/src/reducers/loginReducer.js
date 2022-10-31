import * as actionConstants from '../actions/actionConstants';

const getInitialState = () => {
	if(sessionStorage.getItem("loginstate")) {
		let state = JSON.parse(sessionStorage.getItem("loginstate"));
		return state;
	} else {
		return {
			isLogged:false,
			token:"",
			error:"",
			loading:false
		}
	}
}

const saveToStorage = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
	console.log("loginReducer, action",action);
	let tempState = {};
	switch(action.type) {
		
	}
} 

export default loginReducer;