import React, {Component, PropTypes} from 'react'

import './Phase.scss'
import Navigation from '../Navigation'
import Instructions from '../Instructions'
import type {PhaseObject} from '../interfaces/phase'
import Timeline from '../Timeline'
import Video from '../Video'
import SimultForm from '../SimultForm'
import Timer from 'utils/Timer'
import {mapSecsToMiliSecs} from 'utils/helpers'

import {fetchPhases, nextPhase, finishedInstructions, startPhaseAndVideo, startVideo, stopVideo, startPhase, submitPhaseForm} from '../../modules/phase'

type Props = {
	phase: ?PhaseObject,
	fetchPhases: Function,
	nextPhase: Function,
	finishedInstructions: Function,
	startPhaseAndVideo: Function,
	startVideo: Function,
	stopVideo: Function,
    submitPhaseForm: Function
};

export default class Phase extends Component {

	//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.initiatePhase = this.initiatePhase.bind(this);
        this.stepper = this.stepper.bind(this);
        this.stopVideo = this.stopVideo.bind(this);
        this.pauseVideo = this.pauseVideo.bind(this);
        this.resumeVideo = this.resumeVideo.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
        	timer:null,
        	length: null,
        	finished: false,
        	simult_clicked:false,
        	started:false,
        	stopped:false,
            thumb_loc: 0, 
        	current_stopped: null,
        	current: 0,
        	segment_label:'',
        	break_label:'',
        	breakpoints:[],
        	segmentations:[]
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyDown);

    }

    componentDidMount() {


    }

    componentWillUnmount() {
    	//this.clearInterval(this.state.timer);
        window.removeEventListener('keydown', this.handleKeyDown);
  	}

    initiatePhase() {
    	clearInterval(this.state.timer);
    	this.setState({length:this.props.phase.vid_length})
    	let timer = setInterval(this.stepper, 10);
    	this.setState({timer:timer, started:true});
    	this.props.startPhaseAndVideo();
    }

    stepper(){
    	if(this.state.current < (this.state.length*100)) {
    		//console.log(this.state.current);
    		this.setState({ current: this.state.current + 1 });
    	} else {
    		this.props.stopVideo();
    		clearInterval(this.state.timer);
    		this.setState({started:false, finished:true});
    	}
    }



    handleKeyDown(event) {
        event.preventDefault();
        console.log("s is pressed!")
        console.log(event.keyCode);

        if(this.state.started) {

    	    if(event.keyCode == 83) {
    	   	    
                console.log("space is pressed!")
                if (this.props.retro) {
    	   	   	   let breakp = this.state.current;
    	   	   	   let segment = {
    	   	   		  breakpoint: breakp,
    	   	   		  segment_label:'',
    	   	   		  break_label:''
    	   	   	   }
                   console.log(segment);
    	   	   	   this.setState({
                        breakpoints:[...this.state.breakpoints, breakp],
                        segmentations:[...this.state.segmentations, segment]
    	   	   	   })
                } else {
                    console.log("here?");
                    this.setState({
                        current_stopped: this.state.current,
                        simult_clicked: true,
                        stopped: true,
                    })
                    clearInterval(this.state.timer);
                }
            }
        }
    }

    handleChildSubmit(labels) {

    	let thisbreak = this.state.current_stopped;
    	let segment = {
    		breakpoints: [...this.state.breakpoints, thisbreak],
    		segment_label:labels.segment, 
    		break_label:labels.breakpoint
    	}
    	this.props.submitPhaseForm(segment);
    	let timer = setInterval(this.stepper, 100);
    	this.setState({
    		timer:timer, 
    		stopped:false,
    		breakpoints: [...thus.state.breakpoints, thisbreak]
    	});
    }

    handleThumbChange(location) {

        this.setState({
            thumb_loc: location
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
			<div /*tabIndex="0" onKeyDown={this.handleKeyDown}*/>

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
	
						: <div >

							<div className='videoComponent'>
								<h2 className='instructionsTitle'> Video </h2>
								{this.props.phase.order === 'phase_2'? null : <div className='interactionPreventer'></div>}
								<Video url={this.props.phase.video} play={this.state.started} onThumbChange={this.handleThumbChange}/>
							</div>

							<div  className='timelineComponent'>
								<h2 className='instructionsTitle'> Timeline </h2>
								<p className='instructions'> Use space bar to provide breakpoints. </p>
								<Timeline end={this.props.phase.vid_length ? mapSecsToMiliSecs(this.props.phase.vid_length) : 10000} length={this.props.phase.vid_length} time={this.state.current} breaks={this.state.breakpoints} showLabels={this.props.retro && (this.props.phase.order === 'phase_2')} />
							</div>

							{this.state.simult_clicked ? <SimultForm onItsSubmit={this.handleChildSubmit} /> : null}

							<button className ='btn btn-default next' onClick={this.props.nextPhase} disabled={!this.props.finished}>
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
