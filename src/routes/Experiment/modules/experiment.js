import type {ExperimentObject, ExperimentStateObject} from 'interfaces/experiment.js'
import modelApi from 'utils/modelApi';

// Constants

export const REQUEST_EXPERIMENTS = 'REQUEST_EXPERIMENTS'
export const RECEIVE_EXPERIMENTS= 'RECEIVE_EXPERIMENTS'
export const BRING_SEGMENTATIONS = 'BRING_SEGMENTATIONS'

// Actions


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

const initialState: ExperimentStateObject = {recording:false, saving:false, fetched:false, fetching:false, experiments:[], current:null, record:null}

export default function experimentReducer (state:ExperimentStateObject = initialState, action:Action): ExperimentStateObject {
	const handler = EXPERIMENT_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}





//
