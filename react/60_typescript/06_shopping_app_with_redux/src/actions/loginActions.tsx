import * as actionConstants from '../types/actionConstants';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import User from '../models/User';

interface Token {
	token:string
}

export const register = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/register",{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"register",dispatch)
	}
}

export const login = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/login",{
			method:"POST",
			headers:{"Content-Type":"application/json"},
			body:JSON.stringify(user)
		})
		handleLogin(request,"login",dispatch)
	}
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		const request:Request = new Request("/logout",{
			method:"POST",
			headers:{"Content-Type":"application/json",
			"token":token}
		})
		handleLogin(request,"logout",dispatch)
	}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
	dispatch({
		type:actionConstants.LOADING
	})
	const response = await fetch(request);
	dispatch({
		type:actionConstants.STOP_LOADING
	})
	if(!response) {
		dispatch({
			type:actionConstants.LOGOUT_FAILED,
			error:"There was no response from the server. Logging you out."
		})
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register":
				dispatch({
					type:actionConstants.REGISTER_SUCCESS
				})
				return;
			case "login":
				const temp = await response.json();
				if(!temp) {
					dispatch({
						type:actionConstants.LOGIN_FAILED,
						error:"Failed to parse login information. Try again later."
					})
					return;
				}
				let data = temp as Token;
				dispatch({
					type:actionConstants.LOGIN_SUCCESS,
					token:data.token
				})
				return;
			case "logout":
				dispatch({
					type:actionConstants.LOGOUT_SUCCESS
				})
				return;
			default:
				return;
		}
	} else {
		let errorMessage:string = "Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "register":
				if(response.status === 409) {
					dispatch({
						type:actionConstants.REGISTER_FAILED,
						error:"Username already in use"
					})
				} else {
					dispatch({
						type:actionConstants.REGISTER_FAILED,
						error:"Register failed. "+errorMessage 
					})
				}
				return;
			case "login":
				dispatch({
					type:actionConstants.LOGIN_FAILED,
					error:"Login failed. "+errorMessage
				})
				return;
			case "logout":
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:errorMessage+". Logging you out!"
				})
				return;
			default:
				return;
		}
	}
}