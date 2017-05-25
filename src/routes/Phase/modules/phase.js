import type {PhaseSessionObject, PhaseObject} from 'interfaces/auth.js'
import {browserHistory} from 'react-router'
import modelApi from 'utils/modelApi';

export const START_VIDEO = 'START_VIDEO'
export const STOP_VIDEO = 'STOP_VIDEO'
export const REQUEST_PHASES = 'REQUEST_PHASES'
export const RECEIVE_PHASES = 'RECEIVE_PHASES'
export const FINISHED_INSTRUCTIONS = 'FINISHED_INSTRUCTIONS'
export const NEXT_PHASE ='NEXT_PHASE'
export const END_EXPERIMENT = 'END_EXPERIMENT'
export const SAVE_PHASE_DATA = 'SAVE_PHASE_DATA'


export function requestPhases(): Action {
	return {
		type:REQUEST_PHASES
	}
}

export function receivePhases(phases:Object): Action {
	return {
		type:RECEIVE_PHASES,
		phases
	}
}

export function finishedInstructions(): Action {
	return {
		type:FINISHED_INSTRUCTIONS
	}
}

export function nextPhase(): Action {
	return {
		type:NEXT_PHASE,
	}
}

let current_phase = 0

// It may be better to load everything during the initial page load
// Further signals can be provided to subjects when fetching the videos from youtube.

export const fetchPhases = (): Function => {
	return (dispatch:Function) : Promise => {
		dispatch(requestPhases())

		return modelApi('phases').then(res => {
			dispatch(receivePhases(res.phases))
		})
	}
}


export const Actions = {
	requestPhases,
	receivePhases,
	fetchPhases,
	finishedInstructions,
	nextPhase
}


const PHASE_ACTION_HANDLERS = {

	[REQUEST_PHASES]: (state: PhaseSessionObject): PhaseSessionObject => {
		return({...state, fetching:true})
	},

	[RECEIVE_PHASES]: (state: PhaseSessionObject, action:{phases:Object}): PhaseSessionObject => {
		if ( state.fetched ){
			return ({...state, fetching:false})
		} else {
			const first_phase = action.phases.phases.find(phase => phase.order === 1)
			return ({...state, phases:state.phases.concat(action.phases.phases), experiment:action.phases.name , current:first_phase.cuid, fetched: true, fetching:false})
		}		
	},

	[FINISHED_INSTRUCTIONS]: (state: PhaseSessionObject): PhaseSessionObject => {
		return({...state, instructions:false })
	},

	[NEXT_PHASE]: (state:PhaseSessionObject): PhaseSessionObject => {
		const next_phase = state.phases.find(phase => phase.order === (state.order + 1) )
		return ((state.order + 1) > state.phases.length()) ?
				({...state, finished:true })
			:   ({...state, current:next_phase.cuid, order:state.order+1, instructions: true})
	},

}

// Reducer

const initialState: PhaseSessionObject = { video_playing: false,instructions:false, timeline_active: false, saving_phase_data: false, finished:false, fetched: false, order:0, fetching:false, phases:[], current:null, experiment:null}

export default function phaseReducer (state:PhaseSessionObject = initialState, action:Action): PhaseSessionObject {
	const handler = PHASE_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}
