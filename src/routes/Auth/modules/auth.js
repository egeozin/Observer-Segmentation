import modelApi from 'utils/modelApi';


export const CREATE_SESSION = 'CREATE_SESSION'
export const EMAIL_SIGN_UP_REQUEST = 'EMAIL_SIGN_UP_REQUEST'


export function createSession(): Action {
	return {
		type: CREATE_SESSION,
		payload: {
			subject
		}

	}

}


export const emailSignUpRequest = (): Function => {
	return (dispatch: Function) : Promise => {

		return modelApi('subjects', 'post', {
			signupInfo: {
				email: signupInfo.email,
				password:signupInfo.password,
			},
		}).then(res => 
			{dispatch(createSession(res.signupInfo))}
		)
		
	}

}

export const actions  = {
	createSession,
	emailSignUpRequest
}


// Action Handlers 

const AUTH_ACTION_HANDLERS = {

	[CREATE_SESSION]: (state: RecordStateObject): RecordStateObject => {
		return state.current != null ? ({...state, saved: state.saved.concat(state.current)}) : state
	},

}

// Reducer

const initialState: AuthSessionObject = {email:null, authed:false, ip:null}

export default function experimentReducer (state:ExperimentStateObject = initialState, action:Action): ExperimentStateObject {
	const handler = EXPERIMENT_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

