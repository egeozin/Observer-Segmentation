import { connect } from 'react-redux'
import { fetchPhases, nextPhase, finishedInstructions } from '../modules/phase'

import Phase from '../components/Phase'

import type { PhaseObject } from '../interfaces/phase'

const mapActionCreators: {fetchPhases: Function, nextPhase: Function, finishedInstructions: Function} = {
	fetchPhases,
	nextPhase,
	finishedInstructions
}

const mapStateToProps = (state): {phase: ?PhaseObject} => ({
	phase: state.phase.phases.find(phase => phase.cuid === state.phase.current),
	instructions: state.phase.instructions
})

export default connect(mapStateToProps, mapActionCreators)(Phase)