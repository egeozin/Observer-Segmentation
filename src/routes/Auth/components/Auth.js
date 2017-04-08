import React, {Component, PropTypes} from 'react'
import './Auth.scss'

import {fetchExperiments} from '../modules/auth'
import type {ExperimentObject} from '../interfaces/auth'

type Props = {
	experiments: ?Array<ExperimentObject>,
	fetchExperiments: Function
};

export default class Auth extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
    }

    componentWillMount() {
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
