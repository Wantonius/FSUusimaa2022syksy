import {logoutFailed, loading, stopLoading} from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC ACTION CREATORS

export const getList = (token,search) => {
	return async (dispatch) => {
		let url = "/shopping"
		if(search) {
			url = url + "?type="+search
		}
		let request = {
			method:"GET",
			headers:{"Content-Type":"application/json",
			"token":token}
		}
		dispatch(loading());
		let response = await fetch(url,request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("Failed loading shopping information. Server never responded. Retry later."));
			return;
		}
		if(response.ok) {
			let list = await response.json();
			if(!list) {
				dispatch(fetchListFailed("Failed to parse shopping information. Retry later."))
				return;
			}
			dispatch(fetchListSuccess(list));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session expired. Logging you out."))
			} else {
				dispatch(fetchListFailed("Failed to fetch shopping info. Server responded with a status "+response.status+" "+response.statusText));
			}
			
		}
	}
}

export const add = (token,item) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{"Content-Type":"application/json",
			"token":token},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		let response = await fetch("/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(addItemFailed("Failed to add new item. Server never responded. Retry later."))
			return;
		}
		if(response.ok) {
			dispatch(addItemSuccess());
			dispatch(getList(token));
		} else {
			dispatch(addItemFailed("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText));
		}
	}
}

//ACTION CREATORS

const fetchListSuccess = (list) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		error:error
	}
}

const addItemSuccess = () => {
	return {
		type:actionConstants.ADD_ITEM_SUCCESS
	}
}

const addItemFailed = (error) => {
	return {
		type:actionConstants.ADD_ITEM_FAILED,
		error:error
	}
}

const removeItemSuccess = () => {
	return {
		type:actionConstants.REMOVE_ITEM_SUCCESS
	}
}

const removeItemFailed = (error) => {
	return {
		type:actionConstants.REMOVE_ITEM_FAILED,
		error:error
	}
}

const editItemSuccess = () => {
	return {
		type:actionConstants.EDIT_ITEM_SUCCESS
	}
}

const editItemFailed = (error) => {
	return {
		type:actionConstants.EDIT_ITEM_FAILED,
		error:error
	}
}