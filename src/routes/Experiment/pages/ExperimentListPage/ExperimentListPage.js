import React, { Component } from 'react';
import { connect } from 'react-redux';

import ExperimentList from '../../components/ExperimentList'

import { fetchExperiments } from '../../modules/experiment'


class ExperimentListPage extend Component {
    
    constructor(props){
        super(props);
    }


	render() {
		return (
			<div>
				<ExperimentList experiments={this.props.experiments} />
			</div>

			)

	}

}


ExperimentListPage.propTypes = {

	experiments: PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired
	})).isRequired

}