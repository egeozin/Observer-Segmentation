import type {AuthObject, AuthSessionObject} from 'interfaces/auth.js'
import {browserHistory} from 'react-router'
import modelApi from 'utils/modelApi';

export const CREATE_SESSION = 'CREATE_SESSION'
export const VALIDATE_ADMIN = 'VALIDATE_ADMIN'
export const BRING_ADMIN = 'BRING_ADMIN'



export function createSession(subject:Object): Action {
	return {
		type: CREATE_SESSION,
		subject,
	}
}

export function validateAdmin(admin:Object): Action {
	return {
		type: VALIDATE_ADMIN,
		admin
	}
}


const apiCall = (path:string, signupInfo:Object): Function => {

}

/*
 * API call for logging subjects and validating Admin 
 * @method emailSignUpRequest
 * @param {Object}
 * @return {Promise}
 */

//signupInfo: {email:signupInfo.email, password:signupInfo.password},

export const emailSignUpRequest = (signupInfo:Object): Function => {
	return (dispatch: Function) : Promise => {
		
		return modelApi('signup', 'post', {
			signupInfo: {email:signupInfo.email},
		}).then(res => { 
			dispatch(createSession(res.signupInfo)) 
		}).then(
			// Redirect subjects to experiment.
			// Or if admin redirect to Experiment Analysis section
			browserHistory.push('/phases') 
		)
	};
}

export const actions  = {
	createSession,
	emailSignUpRequest
}

// Action Handlers 

const AUTH_ACTION_HANDLERS = {

	[CREATE_SESSION]: (state: AuthSessionObject, action:{subject:AuthObject}): AuthSessionObject => {
		return state.authed ? state : ({...state, subject: action.subject, authed: true}) 
	},

	[VALIDATE_ADMIN]: (state: AuthSessionObject, action:{subject:AuthObject}): AuthSessionObject => {
		return state.authed ? state : ({...state, subject: action.admin, authed: true}) 
	}

}

// Reducer

const initialState: AuthSessionObject = {subject:null, authed:false, phase:0}

export default function authReducer (state:AuthSessionObject = initialState, action:Action): AuthSessionObject {
	const handler = AUTH_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

