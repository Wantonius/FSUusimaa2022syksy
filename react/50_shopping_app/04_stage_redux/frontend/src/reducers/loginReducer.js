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
		case actionConstants.LOADING:
			return {
				...state,
				loading:true,
				error:""
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register success!"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			tempState = {
				loading:false,
				isLogged:true,
				token:action.token,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				loading:false,
				isLogged:false,
				error:"",
				token:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				loading:false,
				isLogged:false,
				error:action.error,
				token:""
			}
			saveToStorage(tempState);
			return tempState;		
		default:
			return state;
	}
} 

export default loginReducer;