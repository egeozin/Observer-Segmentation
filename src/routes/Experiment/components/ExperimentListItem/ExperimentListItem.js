import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import './ExperimentListItem.scss';
import dateFormat from 'dateformat';


function ExperimentListItem(props) {
	return (
		<div className='experimentItem'>
			<h3>
				<Link to={`/experiments/${props.experiment.cuid}`}>
					{props.experiment.name}
				</Link>
			</h3>
			<p className='experimentDescription'>{props.experiment.description}</p>
			<p className='experimentDate'>{dateFormat(props.experiment.created_at)}</p>
			<hr className='divider'/>
		</div>
	);
}

ExperimentListItem.propTypes =  {
	experiment : PropTypes.shape({
		name : PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		cuid: PropTypes.string.isRequired
	}).isRequired,

};

export default ExperimentListItem