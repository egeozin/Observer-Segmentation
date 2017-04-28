import type {AuthObject, AuthSessionObject} from 'interfaces/auth.js'
import {browserHistory} from 'react-router'
import modelApi from 'utils/modelApi';

export const CREATE_SESSION = 'CREATE_SESSION'

export function createSession(subject:Object): Action {
	return {
		type: CREATE_SESSION,
		subject,
	}
}

export const emailSignUpRequest = (signupInfo:Object): Function => {
	return (dispatch: Function) : Promise => {
		
		return modelApi('signup', 'post', {
			signupInfo: {email:signupInfo.email, password:signupInfo.password},
		}).then(res => { 
			dispatch(createSession(res.sub)) 
		}).then(
			browserHistory.push('/') // Redirect subjects to experiment
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
		console.log(action.subject)
		return state.authed ? state : ({...state, subject: action.subject, authed: true}) 
	},

}

// Reducer

const initialState: AuthSessionObject = {subject:null, authed:false, phase:0}

export default function authReducer (state:AuthSessionObject = initialState, action:Action): AuthSessionObject {
	const handler = AUTH_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

