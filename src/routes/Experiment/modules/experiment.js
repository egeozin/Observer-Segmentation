import type {ExperimentObject, ExperimentStateObject} from 'interfaces/experiment.js'
import modelApi from 'utils/modelApi';

// Constants

export const REQUEST_EXPERIMENTS = 'REQUEST_EXPERIMENTS'
export const RECEIVE_EXPERIMENTS= 'RECEIVE_EXPERIMENTS'
export const BRING_SEGMENTATIONS = 'BRING_SEGMENTATIONS'

export const SAVE_RECORD = 'SAVE_RECORD'
export const RESET_RECORD = 'RESET_RECORD'
export const START_RECORD = 'START_RECORD'

// Actions

/*
export function saveRecord(): Action {
	return {
		type:SAVE_RECORD
	}
}

export function resetRecord(): Action {
	return {
		type:RESET_RECORD
	}
}

export function startRecord(): Action {
	return {
		type:START_RECORD
	}
}
*/

export function requestExperiments(): Action {
	return {
		type:REQUEST_EXPERIMENTS
	}
}

export function receiveExperiments(experiments:Array): Action {
	return {
		type:RECEIVE_EXPERIMENTS,
		payload: {
			experiments
		}
	}
}

export const fetchExperiments = (): Function => {
	return (dispatch: Function) : Promise => {
		dispatch(requestExperiments())

		return modelApi('experiments').then(res => {
			dispatch(receiveExperiments(res.experiments))
		})
		
	}

}

export const actions  = {
	requestExperiments,
	receiveExperiments,
	fetchExperiments
}

// Action Handlers 

const EXPERIMENT_ACTION_HANDLERS = {

	//Record Handlers

	[SAVE_RECORD]: (state: RecordStateObject): RecordStateObject => {
		return state.current != null ? ({...state, saved: state.saved.concat(state.current)}) : state
	},
	[RESET_RECORD]: (state: ZenStateObject, action:{payload:ZenObject}): ZenStateObject => {
		return ({ ...state, zens: state.zens.concat(action.payload), current: action.payload.id, fetching:false})
	},
	[START_RECORD]: (state:ZenStateObject): ZenStateObject => {
		return state.current != null ? ({...state, saved: state.saved.concat(state.current)}) : state
	},

	//Experiment Handlers

	[REQUEST_EXPERIMENTS]: (state: ExperimentStateObject): ExperimentStateObject => {
		return({...state, fetching:true})
	},
	[RECEIVE_EXPERIMENTS]: (state: ExperimentStateObject, action:{payload:Array<ExperimentObject>}): ExperimentStateObject => {
		return state.fetched ? 
				  ({ ...state, fetching:false})
				: ({ ...state, experiments: state.experiments.concat(action.payload.experiments), fetched: true, fetching:false})
	},

}

// Reducer

const initialState: ExperimentStateObject = {recording:false, saving:false, fetching:false, experiments:[], current:null, record:null}

export default function experimentReducer (state:ExperimentStateObject = initialState, action:Action): ExperimentStateObject {
	const handler = EXPERIMENT_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}





//
