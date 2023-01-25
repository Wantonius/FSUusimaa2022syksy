import {useContext,useState,useEffect} from 'react';
import ActionContext from '../context/ActionContext';
import useAppState from './useAppState';
import * as actionConstants from '../types/actionConstants';

const useAction = () => {
	
	const action = useContext(ActionContext);
	
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(state.action === "changemode") {
				action.dispatch({
					type:actionConstants.CHANGE_MODE,
					mode:state.request.mode,
					editable:state.request.editable
				})
				return;
			}
			if(state.url === "") {
				return;
			}
			action.dispatch({
				type:actionConstants.LOADING
			})
			let url = "https://average-sarong-slug.cyclic.app"+state.url
			const response = await fetch(url,state.request);
			action.dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(response.ok) {
				switch(state.action) {
					case "register":
						action.dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					case "login":
						const data = await response.json();
						if(!data) {
							action.dispatch({
								type:actionConstants.LOGIN_FAILED,
								error:"Failed to parse login information."
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
							type:actionConstants.LOGOUT
						})
						return;
					case "getlist":
						const list = await response.json();
						if(!list) {
							action.dispatch({
								type:actionConstants.FETCH_LIST_FAILED,
								error:"Failed to parse shopping information"
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
						getList()
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_SUCCESS
						})
						getList()
						return;						
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_SUCCESS
						})
						changeMode("Add",{
							id:0,
							type:"",
							count:"",
							price:""
						})
						getList();
						return;
					default:
						return;
				}
			} else {
				let message = "Server responded with a status "+response.status+" "+response.statusText
				if(response.status === 403) {
					message = "Your session has expired. Logging you out."
					action.dispatch({
						type:actionConstants.LOGOUT
					})
				}
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							message = "Username already in use"
						}
						dispatch({
							type:actionConstants.REGISTER_FAILED,
							error:message
						})
						return;
					case "login":
						action.dispatch({
							type:actionConstants.LOGIN_FAILED,
							error:message
						})
						return;
					case "logout":
						action.dispatch({
							type:actionConstants.LOGOUT
						})
						return;
					case "getlist":
						action.dispatch({
							type:actionConstants.FETCH_LIST_FAILED,
							error:message
						})
						return;
					case "additem":
						action.dispatch({
							type:actionConstants.ADD_ITEM_FAILED,
							error:message
						})
						return;
					case "removeitem":
						action.dispatch({
							type:actionConstants.REMOVE_ITEM_FAILED,
							error:message
						})
						return;
					case "edititem":
						action.dispatch({
							type:actionConstants.EDIT_ITEM_FAILED,
							error:message
						})
						return;
					default:
						return;
				}
			}
		}
		
		
		fetchData();
	},[state])




	//Service functions

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
				headers:{"token":token}
			},
			action:"logout"
		})
	}

	const getList = () => {
		setState({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{"token":token}
			},
			action:"getlist"
		})
	}

	const addItem = (item) => {
		setState({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
	}

	const remove = (id) => {
		setState({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":token
				}
			},
			action:"removeitem"
		})
	}

	const edit = (item) => {
		setState({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{
					"Content-Type":"application/json",
					"token":token
				},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}

	const changeMode = (mode,editable) => {
		setState({
			url:"",
			request:{
				mode:mode,
				editable:editable
			},
			action:"changemode"
		})
	}
	
	return {register,login,logout,getList,addItem,remove,edit,changeMode}
}

export default useAction;