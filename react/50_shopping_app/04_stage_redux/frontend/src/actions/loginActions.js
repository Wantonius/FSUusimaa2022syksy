import * as actionConstants from './actionConstants';

//ASYNC ACTION CREATORS


//ACTION CREATORS

export const loading = () => {
	return {
		type:actionConstants.LOADING
	}
}

export const stopLoading = () => {
	return {
		type:actionConstants.STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:actionConstants.REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		error:error
	}
}

const loginSuccess = (token) => {
	return {
		type:actionConstants.LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
	return {
		type:actionConstants.LOGIN_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type:actionConstants.LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		error:error
	}
}