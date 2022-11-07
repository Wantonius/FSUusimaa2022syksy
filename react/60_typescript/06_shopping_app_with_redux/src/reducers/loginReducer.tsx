import * as actionConstants from '../types/actionConstants';
import {LoginState} from '../types/states';
import {AnyAction,Reducer} from 'redux';

const getInitialState = ():LoginState => {
	let state = sessionStorage.getItem("loginstate");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			loading:false,
			isLogged:false,
			token:"",
			error:""
		}
	}
}

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const initialState:LoginState = getInitialState();

const loginReducer:Reducer<LoginState,AnyAction> = (state:LoginState = initialState,action:AnyAction):LoginState => {
	return state;
}

export default loginReducer;