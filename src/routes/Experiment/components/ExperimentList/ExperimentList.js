import React, {PropTypes} from 'react'
import './ExperimentList.scss'

import type {ExperimentObject} from '../interfaces/experiment'
import ExperimentListItem from './ExperimentListItem'


export const ExperimentList = (props:Props) => (

	<div className="experimentList">
		{
			props.experiments.map(experiment => (
				<ExperimentListItem
					experiment={experiment}
					key={experiment.cuid}
				/>

				))
		}

	</div>

)

ExperimentList.propTypes = {
	experiments: PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		cuid: PropTypes.string.isRequired
	})).isRequired,

}


export default ExperimentList