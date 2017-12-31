import { connect } from 'react-redux'
import { fetchPhases, fetchNextPhases, endExperiment, nextPhase, repeatPhase, finishedInstructions, startPhaseAndVideo, startPhase, startVideo, stopVideo, endPhase, submitPhaseForm, savePhaseData} from '../modules/phase'

import Phase from '../components/Phase'

import type { PhaseObject } from '../interfaces/phase'

const mapActionCreators: {fetchPhases: Function, fetchNextPhases: Function, endExperiment:Function, nextPhase: Function, finishedInstructions: Function, startVideo:Function, stopVideo:Function, repeatPhase:Function, startPhaseAndVideo:Function, startPhase:Function, endPhase:Function, savePhaseData:Function, submitPhaseForm:Function} = {
	fetchPhases,
	fetchNextPhases,
	endExperiment,
	nextPhase,
	finishedInstructions,
	startVideo,
	stopVideo,
	startPhase,
	startPhaseAndVideo,
	endPhase,
	submitPhaseForm,
	savePhaseData,
	repeatPhase
}

const mapStateToProps = (state): {phase: ?PhaseObject} => ({
	phase: state.phase.phases.find(phase => phase.cuid === state.phase.current),
	types: state.phase.phases.map(phase => phase.type),
	id: state.phase.subject_name,
	instructions: state.phase.instructions,
	video: state.phase.video,
	playing: state.phase.video_playing,
	finished: state.phase.phase_finished,
	started: state.phase.phase_started,
	retro: state.phase.retro,
})

export default connect(mapStateToProps, mapActionCreators)(Phase)