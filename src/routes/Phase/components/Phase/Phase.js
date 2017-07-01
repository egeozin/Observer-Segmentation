import React, {Component, PropTypes} from 'react'

import './Phase.scss'
import Navigation from '../Navigation'
import Instructions from '../Instructions'
import type {PhaseObject} from '../interfaces/phase'
import Timeline from '../Timeline'
import Video from '../Video'
import Timer from 'utils/Timer';
import {mapSecsToMiliSecs} from 'utils/Timer';

import {fetchPhases, nextPhase, finishedInstructions} from '../../modules/phase'

type Props = {
	phase: ?PhaseObject,
	fetchPhases: Function,
	nextPhase: Function,
	finishedInstructions: Function,
	startVideo: Function,
	stopVideo: Function,
};

export default class Phase extends Component {

	//export const Experiment = (props: Props) => (
    constructor(props){
        super(props)
        this.state = {
        	finished: false,
        	started:false,
        }
    }

    componentWillMount() {
    	console.log(this.props)
    	console.log(this.props.phase)
    	const timer = Timer(this.props.phase.vid_length)
    }

	render(){
		
		return (
			<div>
				<Navigation />

				{ this.props.phase ? 

					<div className='phaseWrapper'>

					{this.props.instructions
						? <div>
							<h2 className='instructionsTitle'>
								{this.props.phase.title}
							</h2>
							<p className='instructions'>{this.props.phase.instructions}</p>
		
							<button className ='btn btn-default' onClick ={this.props.finishedInstructions}>
					 			Got it!
							</button>
						</div>
	
						: <div>

							<div className='videoComponent'>
								<h2 className='instructionsTitle'> Video </h2>
								{this.props.phase.order === 'phase_2'? null : <div className='interactionPreventer'></div>}
								<Video url={this.props.phase.video} />
							</div>

							<div className='timelineComponent'>
								<h2 className='instructionsTitle'> Timeline </h2>
								<p className='instructions'> Use space bar to provide breakpoints. </p>
								<Timeline end={mapSecsToMiliSecs(this.props.phase.vid_length)} time={this.state.counter} />
							</div>

							<button className ='btn btn-default start' onClick ={this.props.nextPhase} disabled={this.props.started}>
					 			Start
							</button>
	
							<button className ='btn btn-default next' onClick ={this.props.nextPhase} disabled={!this.props.finished}>
					 			Next Phase
							</button>
						</div>
					}
				</div>

				: null
			}

			</div>

		)
	}

}

Phase.propTypes = {

	phase: PropTypes.objectOf(PropTypes.shape({
		cuid : PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		instructions: PropTypes.string.isRequired,
		video: PropTypes.string,
		vid_length: PropTypes.number,
		order:PropTypes.number.isRequired,
		type:PropTypes.string.isRequired
	})),

	instructions: PropTypes.bool.isRequired
	
}
