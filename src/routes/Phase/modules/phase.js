import type {PhaseSessionObject, PhaseObject} from 'interfaces/auth.js'
import {browserHistory} from 'react-router'
import modelApi from 'utils/modelApi';

export const START_PHASE = 'START_PHASE'
export const END_PHASE = 'END_PHASE'
export const START_VIDEO = 'START_VIDEO'
export const STOP_VIDEO = 'STOP_VIDEO'
export const REQUEST_PHASES = 'REQUEST_PHASES'
export const RECEIVE_PHASES = 'RECEIVE_PHASES'
export const RECEIVE_NAME = 'RECEIVE_NAME'
export const FINISHED_INSTRUCTIONS = 'FINISHED_INSTRUCTIONS'
export const FINISHED_PHASE = 'FINISHED_PHASE'
export const SUBMIT_PHASE_FORM = 'SUBMIT_PHASE_FORM'
export const NEXT_EXPERIMENT = 'NEXT_EXPERIMENT'
export const NEXT_PHASE ='NEXT_PHASE'
export const SAVE_NEXT_PHASE ='SAVE_NEXT_PHASE'
export const END_EXPERIMENT = 'END_EXPERIMENT'
export const SAVE_PHASE_DATA = 'SAVE_PHASE_DATA'
export const REQUEST_PHASE_SAVE = 'REQUEST_PHASE_SAVE'
export const REPEAT_PHASE = 'REPEAT_PHASE'
export const RETURN_STATE = 'RETURN_STATE'


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

export function receiveName(name:String): Action {
	const payload = {name: name};
	return {
		type:RECEIVE_NAME,
		payload
	}
}

export function finishedInstructions(): Action {
	return {
		type:FINISHED_INSTRUCTIONS
	}
}

export function nextPhase(): Action {
	return {
		type:NEXT_PHASE
	}
}

export function repeatPhase(): Action {
	return {
		type:REPEAT_PHASE
	}
}

export function savedNNextPhase(segment:Object): Action {
	return {
		type:SAVE_NEXT_PHASE,
		segment
	}
}

export function returnState() : Action {
	return {
		type:RETURN_STATE
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

export function submitPhaseForm(segment:Object):Action {
	return {
		type:SUBMIT_PHASE_FORM,
		segment
	}
}

export function requestPhaseSave():Action {
	return {
		type:REQUEST_PHASE_SAVE
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

export const savePhaseData = (phaseData): Function => {
		return (dispatch:Function, getState) : Promise => {
		dispatch(requestPhaseSave())

		const sessionDetails = getState().phase

		return modelApi('segment', 'post', {
			phaseData: {
				segmentations: phaseData.segmentations,
				duration: phaseData.duration,
				type: phaseData.type,
				experiment: sessionDetails.experiment,
				experiment_id: sessionDetails.experiment_id,
				subject: sessionDetails.subject_name 
			}
		}).then(res => {
			dispatch(savedNNextPhase(res.segmentation))

		})

	}
}

// Need to write a better HTML generator. For example <p></p>+ <p></p> + <img/> <p></p>
// How, so order of page elements, or just plain html? A page maybe

export const Actions = {
	requestPhases,
	receivePhases,
	receiveName,
	fetchPhases,
	finishedInstructions,
	nextPhase,
	repeatPhase,
	returnState,
	savedNNextPhase,
	startVideo,
	stopVideo,
	startPhase,
	endPhase,
	startPhaseAndVideo,
	submitPhaseForm,
	requestPhaseSave,
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
			console.log(action.phases.id)
			return ({...state, phases:state.phases.concat(action.phases.phases), retro:isRetro , experiment:action.phases.name, experiment_id:action.phases.id, current:first_phase.cuid, fetched: true, fetching:false})
		}		
	},

	[RECEIVE_NAME]: (state: PhaseSessionObject, action:{payload:Object}): PhaseSessionObject => {
		return ({...state, subject_name: action.payload.name})
	},

	[SUBMIT_PHASE_FORM]:(state:PhaseSessionObject, action:{segment:Object}): PhaseSessionObject => {
		if (action.segment.idx) {
			let idx = action.segment.idx
			return ({...state, segmentations:Object.assign([...state.segmentations], {idx: {segment_label: action.segment.segment_label, break_label: action.segment.break_label}})})
		} else {
			return ({...state, segmentations:state.segmentations.concat({segment_label:action.segment.segment_label, break_label:action.segment.break_label}), breakpoints:state.breakpoints.concat(action.segment.breakpoints)}) 
		}
	},

	[REQUEST_PHASE_SAVE]: (state: PhaseSessionObject): PhaseSessionObject => {
		return({...state, fetching:true})
	},

	[START_VIDEO]: (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, video_playing:true})
	},

	[STOP_VIDEO]: (state: PhaseSessionObject): PhaseSessionObject => {
		return ({...state, video_playing:false})
	},

	[RETURN_STATE]: (state:PhaseSessionObject): PhaseSessionObject => {
		return {experiment:state.experiment, experiment_id:state.experiment_id, subject_name:state.subject_name}
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

	[REPEAT_PHASE]: (state:PhaseSessionObject): PhaseSessionObject => {
		const this_phase = state.phases.find(phase => phase.order === (state.order))
		return ({...state, current:this_phase.cuid, order:state.order, instructions: true})
	},

	[NEXT_PHASE]: (state:PhaseSessionObject): PhaseSessionObject => {
		if ((state.order + 1) >= state.phases.length) {
			return ({...state, finished:true }) 
		} else {
			const next_phase = state.phases.find(phase => phase.order === (state.order + 1))
			return ({...state, current:next_phase.cuid, order:state.order+1, instructions: true})
		}
			 
	},

	[SAVE_NEXT_PHASE]: (state:PhaseSessionObject, action:{segment:Object} ): PhaseSessionObject => {
		if ((state.order + 1) >= state.phases.length) {
			return ({...state, finished:true }) 
		} else {
			const next_phase = state.phases.find(phase => phase.order === (state.order + 1))
			return ({...state, current:next_phase.cuid, order:state.order+1, instructions: true, identified:action.segment.segments.map((arr) => {return false}) })
		}
	},
	

}

// Reducer

const initialState: PhaseSessionObject = { video_playing: false, breakpoints:[], segmentations:[], identified:[], retro: true, phase_started:false, phase_finished: false, instructions:true, timeline_active: false, saving_phase_data: false, finished:false, fetched: false, order:0, fetching:false, phases:[], current:null, experiment:null, experiment_id:null, subject_name:null}

export default function phaseReducer (state:PhaseSessionObject = initialState, action:Action): PhaseSessionObject {
	const handler = PHASE_ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}
