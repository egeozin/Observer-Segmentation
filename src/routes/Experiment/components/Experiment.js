import React from 'react'
import './Experiment.scss'

import type {ExperimentStateObject, ExperimentObject} from '../interfaces/experiment'

type Props = {
	experiment: ?ExperimentObject,
	fetchVideo:Function,
	saveRecord: Function
};

export const Experiment = (props: Props) => (

	<div>
		<p> Woohoo! It will work </p>
	</div>

	)


Experiment.propTypes = {
	
}

export default Experiment