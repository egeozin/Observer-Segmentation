import { connect } from 'react-redux'
import { fetchExperiments } from '../modules/experiment'

import Experiment from '../components/Experiment'

import type { ExperimentObject } from '../interfaces/experiment'

const mapActionCreators: {fetchExperiments: Function} = {
	fetchExperiments
}


const mapStateToProps = (state): {experiment: ?ExperimentObject} => ({
	experiments: state.experiment.experiments,
	//saved: state.zen.zens.filter(zen=> state.zen.saved.indexOf(zen.id) !== -1)
})

export default connect(mapStateToProps, mapActionCreators)(Experiment)