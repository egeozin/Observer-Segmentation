import React, {Component, PropTypes} from 'react'
import './Experiment.scss'

import ExperimentList from './ExperimentList';
import type {ExperimentObject} from '../interfaces/experiment'

import {fetchExperiments} from '../modules/experiment'

type Props = {
	experiments: ?Array<ExperimentObject>,
	fetchExperiments: Function
};

export default class Experiment extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
    }

    componentWillMount() {
    	this.props.fetchExperiments();
    }

	render(){
		
		return (

		<div >
			<ExperimentList experiments={this.props.experiments} />
		</div>
	
		)
	}

}

Experiment.propTypes = {

	experiments: PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired
	})).isRequired
	
}
