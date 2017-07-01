import { connect } from 'react-redux'
import { fetchPhases, nextPhase, finishedInstructions, startVideo, stopVideo, startPhase } from '../modules/phase'

import Phase from '../components/Phase'

import type { PhaseObject } from '../interfaces/phase'

const mapActionCreators: {fetchPhases: Function, nextPhase: Function, finishedInstructions: Function} = {
	fetchPhases,
	nextPhase,
	finishedInstructions,
	startVideo,
	stopVideo,
	startPhase
}

const mapStateToProps = (state): {phase: ?PhaseObject} => ({
	phase: state.phase.phases.find(phase => phase.cuid === state.phase.current),
	instructions: state.phase.instructions,
	playing: state.phase.video_playing,
	finished: state.phase.phase_finished,
	started: state.phase.phase_started,

})

export default connect(mapStateToProps, mapActionCreators)(Phase)