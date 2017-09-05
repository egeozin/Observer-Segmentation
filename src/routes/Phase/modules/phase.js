import type {PhaseSessionObject, PhaseObject} from 'interfaces/auth.js'
import {browserHistory} from 'react-router'
import modelApi from 'utils/modelApi';


export const START_PHASE = 'START_PHASE'
export const END_PHASE = 'END_PHASE'
export const START_VIDEO = 'START_VIDEO'
export const STOP_VIDEO = 'STOP_VIDEO'
export const REQUEST_PHASES = 'REQUEST_PHASES'
export const RECEIVE_PHASES = 'RECEIVE_PHASES'
export const FINISHED_INSTRUCTIONS = 'FINISHED_INSTRUCTIONS'
export const FINISHED_PHASE = 'FINISHED_PHASE'
export const SUBMIT_PHASE_FORM = 'SUBMIT_PHASE_FORM'
export const NEXT_EXPERIMENT = 'NEXT_EXPERIMENT'
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

export function startVideo(): Action {
	return {
		type:START_VIDEO
	}
}

export function stopVideo(): Action {
	return {
		type:STOP_VIDEO
	}
}

export function startPhase(): Action {
	return {
		type:START_PHASE
	}
}

export function endPhase(): Action {
	return {
		type:END_PHASE
	}
}

export function submitPhaseForm(segmentation:Object):Action {
	return {
		type:SUBMIT_PHASE_FORM,
		segmentation
	}
}

export function savePhaseData():Action {
	return {
		type:SAVE_PHASE_DATA
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



export const startPhaseAndVideo = (): Function => {
	return(dispatch: Function) => {
		dispatch(startPhase())
		dispatch(startVideo())
	}
}


// Need to write a better HTML generator. For example <p></p>+ <p></p> + <img/> <p></p>
// How, so order of page elements, or just plain html? A page maybe

export const Actions = {
	requestPhases,
	receivePhases,
	fetchPhases,
	finishedInstructions,
	nextPhase,
	startVideo,
	stopVideo,
	startPhase,
	endPhase,
	startPhaseAndVideo,
	submitPhaseForm,
	savePhaseData
}


const PHASE_ACTION_HANDLERS = {

	[REQUEST_PHASES]: (state: PhaseSessionObject): PhaseSessionObject => {
		return({...state, fetching:true})
	},

	[RECEIVE_PHASES]: (state: PhaseSessionObject, action:{phases:Object}): PhaseSessionObject => {
		if ( state.fetched ){
			return ({...state, fetching:false})
		} else {
			const first_phase = action.phases.phases.find(phase => phase.order === 0)
			let re = new RegExp('^[^_]+(?=_)')
			let isRetro = re.exec(action.phases.name)[0] === 'retrospective'
			return ({...state, phases:state.phases.concat(action.phases.phases), retro:isRetro , experiment:action.phases.name , current:first_phase.cuid, fetched: true, fetching:false})
		}		
	},

	[SUBMIT_PHASE_FORM]:(state:PhaseSessionObject, action:{segmentation:Object}): PhaseSessionObject => {
		return({...state, segmentations:state.segmentations.concat(action.segmentation), breakpoints:state.breakpoints.concat(action.segmentation.breakpoints)})

	},

	[SAVE_PHASE_DATA]:(state:PhaseSessionObject):PhaseSessionObject => {
		retunr({...state, })

	},

	[START_VIDEO]: (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, video_playing:true})
	},

	[STOP_VIDEO]: (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, video_playing:false})
	},

	[START_PHASE]:  (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, phase_started:true})
	},

	[END_PHASE]:  (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, phase_started:false})
	},

	[FINISHED_INSTRUCTIONS]: (state: PhaseSessionObject): PhaseSessionObject => {
		const next_phase = state.phases.find(phase => phase.order === (state.order + 1) )
		return state.order === 0 ?
				({...state, current:next_phase.cuid, order: state.order+1, instructions:true })
			:   ({...state, instructions:false })
	},

	[NEXT_PHASE]: (state:PhaseSessionObject): PhaseSessionObject => {
		const next_phase = state.phases.find(phase => phase.order === (state.order + 1))
		return ((state.order + 1) > state.phases.length()) ?
				({...state, finished:true })
			:   ({...state, current:next_phase.cuid, order:state.order+1, instructions: true})
	},

}

// Reducer

const initialState: PhaseSessionObject = { video_playing: false, breakpoints:[], segmentations:[],retro: true, phase_started:false, phase_finished: false, instructions:true, timeline_active: false, saving_phase_data: false, finished:false, fetched: false, order:0, fetching:false, phases:[], current:null, experiment:null}

export default function phaseReducer (state:PhaseSessionObject = initialState, action:Action): PhaseSessionObject {
	const handler = PHASE_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}
