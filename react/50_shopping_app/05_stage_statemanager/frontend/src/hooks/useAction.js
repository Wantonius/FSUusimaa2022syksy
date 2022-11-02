import {useState,useEffect,useContext} from 'react';
import ActionContext from '../context/ActionContext';
import * as actionConstants from '../context/actionConstants';
import useAppState from './useAppState';

const useAction = () => {
	
	const action = useContext(ActionContext);
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	});
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const contactBackend = async () => {
			if(!state.url) {
				return;
			}
			action.dispatch({
				type:actionConstants.LOADING
			})
			let response = await fetch(state.url,state.request);
			action.dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				action.dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"There was no response from the server. Logging you out."
				})
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						let data = await response.json();
						if(!data) {
							action.dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Cannot parse login information. Login failed."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.LOGIN_SUCCESS,
							token:data.token
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_SUCCESS
						})
						return;
					case "getlist":
						let list = await response.json();
						if(!list) {
							action.dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information. Try again later."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.FETCH_LIST_SUCCESS,
							list:list
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_ITEM_SUCCESS
						})
						getList();
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList();
						return;
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						getList();
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					action.dispatch({
						type:actionConstants.LOGOUT_FAILED,
						error:"Your session has expired. Logging you out."
					})
					return;
				}
				let errorStatus = "Server responded with a status "+response.status+" "+response.statusText
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							action.dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use."
							})
							return;
						}
						action.dispatch({
							type:actionConstants.REGISTER_FAILED,
							error:"Register failed. "+errorStatus
						});
						return;
					case "login":
						action.dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:"Login failed. "+errorStatus
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT_FAILED,
							error:"Server responded with an error. Logging you out."
						})
						return;
					case "getlist":
						action.dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							error:"Failed to fetch shopping information. "+errorStatus
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							error:"Adding an item failed. "+errorStatus
						})
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:"Removing an item failed. "+errorStatus
						})
						return;
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							error:"Editing an item failed. "+errorStatus
						})
						return;
					default:
						return;
				}
			}
		}
		
		contactBackend();
	},[state])
	
	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {
		setState({
			url:"/login",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"login"
		})
	}	

	const logout = () => {
		setState({
			url:"/logout",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"logout"
		})
	}
	
	const getList = (query) => {
		let url = "/api/shopping";
		if(query) {
			url = url + query;
		}
		setState({
			url:url,
			request:{
				method:"GET",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"getlist"
		})
	}
	
	const add = (item) => {
			setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"additem"
		})	
	}

	const remove = (id) =>  {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{"Content-Type":"application/json",
				"token":token}
			},
			action:"removeitem"
		})		
	}

	const edit = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
				"token":token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	const setError = (error) => {
		action.dispatch({
			type:actionConstants.REGISTER_FAILED,
			error:error
		})
	}

	return {register,login,logout,getList,add,remove,edit,setError}
}

export default useAction;