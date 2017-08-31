import { connect } from 'react-redux'
import { fetchPhases, nextPhase, finishedInstructions, startPhaseAndVideo, startPhase, startVideo, stopVideo, endPhase } from '../modules/phase'

import Phase from '../components/Phase'

import type { PhaseObject } from '../interfaces/phase'

const mapActionCreators: {fetchPhases: Function, nextPhase: Function, finishedInstructions: Function, startVideo:Function, stopVideo:Function, startPhaseAndVideo:Function, startPhase:Function, endPhase:Function} = {
	fetchPhases,
	nextPhase,
	finishedInstructions,
	startVideo,
	stopVideo,
	startPhase,
	startPhaseAndVideo,
	endPhase
}

const mapStateToProps = (state): {phase: ?PhaseObject} => ({
	phase: state.phase.phases.find(phase => phase.cuid === state.phase.current),
	instructions: state.phase.instructions,
	playing: state.phase.video_playing,
	finished: state.phase.phase_finished,
	started: state.phase.phase_started,
	retro: state.phase.retro,
})

export default connect(mapStateToProps, mapActionCreators)(Phase)