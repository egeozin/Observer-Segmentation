import React, {Component, PropTypes} from 'react'

import './Phase.scss'
import Navigation from '../Navigation'
import Instructions from '../Instructions'
import type {PhaseObject} from '../interfaces/phase'
import Timeline from '../Timeline'
import Video from '../Video'
import Timer from 'utils/Timer'
import {mapSecsToMiliSecs} from 'utils/helpers'

import {fetchPhases, nextPhase, finishedInstructions, startVideo, stopVideo, startPhase} from '../../modules/phase'

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
        super(props);
        this.initiatePhase = this.initiatePhase.bind(this);
        this.stopVideo = this.stopVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.resumeVideo = this.resumeVideo.bind(this);
        this.state = {
        	time:null,
        	finished: false,
        	started:false,
        	current: 0
        }
    }

    componentWillMount() {
    	console.log(this.props);
    	console.log(this.props.phase);
    	const timer = Timer(this.props.phase.vid_length);
    	console.log(timer);
    }

    initiatePhase() {
    	timer.startTimer();
    	let time = setInterval(this.stepper(), 500);
    	this.setState({time:time, started:true});
    	this.props.startPhaseAndVideo();
    }

    stepper(){
    	console.log(timer.returnStep())
    	this.setState({
    		current: timer.returnStep()
    	})
    }

    stopVideo() {

    }

    pauseVideo() {

    }

    resumeVideo() {
    	
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
								<Video url={this.props.phase.video} play={this.state.started}/>
							</div>

							<div className='timelineComponent'>
								<h2 className='instructionsTitle'> Timeline </h2>
								<p className='instructions'> Use space bar to provide breakpoints. </p>
								<Timeline end={this.props.phase.vid_length ? mapSecsToMiliSecs(this.props.phase.vid_length) : 10000} time={this.state.current} />
							</div>

							<button className ='btn btn-default next' onClick ={this.props.nextPhase} disabled={!this.props.finished}>
					 			Next Phase
							</button>

							{ this.props.phase.order === 'phase_2' ? 

								( this.props.started ?

								<button className='btn btn-default start' onClick={this.stopVideo} disabled={!this.props.started}> Stop </button> 

								: <button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.props.started} > Start </button> ) 

								:  ( <button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.props.started} > Start </button> )

							}

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
