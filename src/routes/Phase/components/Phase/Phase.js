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

import {fetchPhases, nextPhase, finishedInstructions, startPhaseAndVideo, startVideo, savePhaseData, stopVideo, startPhase, submitPhaseForm, repeatPhase} from '../../modules/phase'

type Props = {
	phase: ?PhaseObject,
	fetchPhases: Function,
	nextPhase: Function,
	finishedInstructions: Function,
	startPhaseAndVideo: Function,
	startVideo: Function,
	stopVideo: Function,
    submitPhaseForm: Function,
    savePhaseData: Function,
    repeatPhase: Function,
};

export default class Phase extends Component {

	//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.initiatePhase = this.initiatePhase.bind(this);
        //this.stepper = this.stepper.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.savePhase = this.savePhase.bind(this);
        this.reinitializeState = this.reinitializeState.bind(this);
        this.handleChildSubmit = this.handleChildSubmit.bind(this);
        this.handleThumbChange = this.handleThumbChange.bind(this);
        this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
        this.timelineElementClicked = this.timelineElementClicked.bind(this);
        this.progress = this.progress.bind(this);
        this.videoReady = this.videoReady.bind(this);
        this.videoEnds = this.videoEnds.bind(this);
        this.state = {
        	timer:null,
        	length: null,
        	finished: false,
        	simult_clicked:false,
            retro_clicked:false,
            video_ready: false,
            video_ended: false,
        	started:false,
        	stopped:false,
            thumb_loc: 0,
            form_pos: 0,
        	current_stopped: null,
        	current: 0,
        	breakpoints:[],
        	segmentations:[],
            identified:[], 
            clicked_element: null,
            duration_flag: false
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
    	//clearInterval(this.state.timer);
    	this.setState({length:this.props.phase.vid_length})
    	//let timer = setInterval(this.stepper, 10);
    	//this.setState({timer:timer, started:true});
        this.setState({started:true});
    	this.props.startPhaseAndVideo();
    }

    progress(progs) {
        console.log(progs.playedSeconds);

        if (progs.playedSeconds < this.state.length){
            this.setState({ current: progs.playedSeconds*100})
        } else {
            this.props.stopVideo();
            //clearInterval(this.state.timer);

            let breakp = this.state.current;
            let segment = {
               breakpoint: breakp,
               segment_label:'',
               break_label:''
            }
            this.setState({
                started: false,
                finished: true,
                breakpoints:[...this.state.breakpoints, breakp],
                segmentations:[...this.state.segmentations, segment]
            })
        }
    }

    /*
    stepper(){
    	if(this.state.current < (this.state.length*100)) {
    		//console.log(this.state.current);
    		this.setState({ current: this.state.current + 1 });
    	} else {
    		this.props.stopVideo();
    		clearInterval(this.state.timer);

            let breakp = this.state.current;
            let segment = {
               breakpoint: breakp,
               segment_label:'',
               break_label:''
            }
            this.setState({
                started: false,
                finished: true,
                breakpoints:[...this.state.breakpoints, breakp],
                segmentations:[...this.state.segmentations, segment]
            })
    	}
    } */

    handleKeyDown(event) {
        event.preventDefault();

        if(this.state.started && this.props.phase.type !== 'phase_2' ) {

    	    if(event.keyCode == 83) {
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
                    // Should think about whether it's better to change state from Parent component
                    // Or executing an instance method.
                    console.log(this.state.current);
                    this.setState({
                        current_stopped: this.state.current,
                        simult_clicked: true,
                        stopped: true,
                        started:false
                    })
                    clearInterval(this.state.timer);
                    window.removeEventListener('keydown', this.handleKeyDown);

                }
            }
        }
    }

    handleChildSubmit(labels) {

        if (!this.props.retro){
    	   let thisbreak = this.state.current_stopped;
    	   let segment = {
                breakpoint: thisbreak,
                segment_label:labels.segment, 
                break_label:labels.breakpoint
    	   }
    	   this.props.submitPhaseForm(segment)
    	   let timer = setInterval(this.stepper, 10);
    	   this.setState({
                timer:timer, 
                stopped:false,
                started: true,
                simult_clicked:false,
                breakpoints: [...this.state.breakpoints, thisbreak]
    	   }); 
        }
        else {
            let segment = {
                segment_label:labels.segment,
                break_label:labels.breakpoint,
                idx:this.state.clicked_element
            }
            console.log(this.state.clicked_element)
            this.props.submitPhaseForm(segment)

        }

        window.addEventListener('keydown', this.handleKeyDown);
    }



    timelineElementClicked(xpos, idx) {
        this.setState({
            retro_clicked: true,
            form_pos: xpos,
            clicked_element: idx,
            identified: this.state.identified.map((e, i) => {return i === idx ? true : false})
        })
    }


    videoReady() {
        this.setState({
            video_ready: true
        })
    }

    videoEnds() {
        this.setState({
            video_ended: true
        })
    }

    handleThumbChange(location) {
        console.log(location)

        this.setState({
            thumb_loc: location
        })

    }

    handleBreakpointChange(location) {
        this.refs.video.seekToLocation(location)
    }

    reinitializeState(){
        this.setState({
            timer:null,
            length: null,
            finished: false,
            simult_clicked:false,
            retro_clicked:false,
            video_ready: false,
            video_ended: false,
            started:false,
            stopped:false,
            thumb_loc: 0,
            form_pos: 0,
            current_stopped: null,
            current: 0,
            segment_label:'',
            break_label:'',
            breakpoints:[],
            segmentations:[],
            identified:[],
            clicked_element: null,
            duration_flag: false
        });
    }

    savePhase() {

        // During development, being able to skip phases might be better.

        // Check whether there are enough segments
        const nSegment = this.state.breakpoints.length 
        if (nSegment > 3) {
            if (this.props.phase.type === 'phase_2' || this.props.phase.type === 'phase_1' || this.props.phase.type === 'baseline' ) {

                this.props.savePhaseData({
                    segmentations: this.state.segmentations,
                    duration: this.state.length,
                    type: this.props.phase.type
                })

                if (this.props.phase.type === 'phase_1' && this.props.retro) {
                    this.setState({
                        identified: this.state.segmentations.map((arr) => {return false}),
                        finished: false,
                    })
                }

            } else {
                this.reinitializeState()
                this.props.nextPhase()
                
            } 

        } else {
            this.reinitializeState()
            this.props.repeatPhase()
        }

    }

	render(){
		return (
			<div /*tabIndex="0" onKeyDown={this.handleKeyDown}*/>

				{ this.props.phase ? 

                    <div >
                        <Navigation active={this.props.phase.type} types={this.props.types}/>

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
								<Video ref="video" onVideoReady={this.videoReady} url={this.props.phase.video} onVideoProgress={this.progress} play={this.state.started} whenEnd={this.videoEnds} onThumbChange={this.handleThumbChange} />
							</div>

							<div  className='timelineComponent'>
								<h2 className='instructionsTitle'> Timeline </h2>
								<p className='instructions'> Press space bar to provide breakpoints. </p>
								<Timeline end={this.props.phase.vid_length ? mapSecsToMiliSecs(this.props.phase.vid_length) : 10000} onElementClick={this.timelineElementClicked} length={this.props.phase.vid_length} time={this.state.current} breaks={this.state.breakpoints} finished={this.state.finished} showLabels={this.props.retro && (this.props.phase.type === 'phase_2')} />
							</div>

							{this.state.simult_clicked ? <SimultForm onItsSubmit={this.handleChildSubmit} xPos={this.state.form_pos} /> : null}

                            {this.state.retro_clicked ? <SimultForm onItsSubmit={this.handleChildSubmit} identified={this.state.identified} xPos={this.state.form_pos}  /> : null}

                            { (this.props.phase.order === 'phase_2' && this.props.retro) || (this.props.phase.order === 'phase_1' && !this.props.retro) ? 

							     <button className ='btn btn-default next' onClick={this.savePhase} disabled={!this.state.finished}> Finalize </button> :

                                 <button className ='btn btn-default next' onClick={this.savePhase} disabled={this.state.finished && !this.state.finished}> Next Phase </button>
                            }

							{ (this.props.phase.order === 'phase_2' && this.props.retro) || (this.props.phase.order === 'phase_1' && !this.props.retro) ? 

								( this.props.started ?

								<button className='btn btn-default start' onClick={this.stopVideo} disabled={!this.state.started}> Stop </button> 

								: <button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.state.started} > Start </button> ) 

								:  ( <button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.state.started} > Start </button> )

							}

						</div>
					}

				</div>

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
