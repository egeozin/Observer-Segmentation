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

import {fetchPhases, fetchNextPhases, endExperiment, nextPhase, finishedInstructions, startPhaseAndVideo, startVideo, savePhaseData, stopVideo, startPhase, submitPhaseForm, repeatPhase} from '../../modules/phase'

type Props = {
	phase: ?PhaseObject,
	fetchPhases: Function,
    fetchNextPhases: Function,
    endExperiment: Function,
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
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.savePhase = this.savePhase.bind(this);
        this.reinitializeState = this.reinitializeState.bind(this);
        this.handleChildSubmit = this.handleChildSubmit.bind(this);
        this.handleThumbChange = this.handleThumbChange.bind(this);
        this.timelineElementClicked = this.timelineElementClicked.bind(this);
        this.cursorDragged = this.cursorDragged.bind(this);
        this.cursorStarted = this.cursorStarted.bind(this);
        this.progress = this.progress.bind(this);
        this.videoReady = this.videoReady.bind(this);
        this.videoEnds = this.videoEnds.bind(this);
        this.videoPlay = this.videoPlay.bind(this);
        this.videoPause = this.videoPause.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.closeRetroForm = this.closeRetroForm.bind(this);
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
        if (!this.state.length) {
            this.setState({length:this.props.phase.vid_length})
        }	
    	//let timer = setInterval(this.stepper, 10);
    	//this.setState({timer:timer, started:true});
        this.setState({started:true});
    	this.props.startPhaseAndVideo();
    }

    updateDuration(dur){
        console.log(dur);
        this.setState({length:dur})
    }

    progress(progs) {


        if (this.props.phase.type !== 'phase_2') {

            if (this.state.video_ended) {
                this.props.stopVideo();
                //clearInterval(this.state.timer);

                console.log(this.state.current)
                let breakp = this.state.length*100;
                let segment = {
                    breakpoint: breakp,
                    segment_label:'',
                    break_label:''
                }

               
                this.setState({
                    started: false,
                    stopped: true,
                    finished: true,
                    breakpoints:[...this.state.breakpoints, breakp],
                    segmentations:[...this.state.segmentations, segment]
                })

            

            } else if (progs.playedSeconds < this.state.length){

                this.setState({ current: progs.playedSeconds*100})

            }
        } else {

            if (this.state.video_ended) {
                //this.props.stopVideo();

                this.setState({
                        started: false,
                        stopped:true,
                        breakpoints:[...this.state.breakpoints, breakp],
                        segmentations:[...this.state.segmentations, segment]
                })

            } else if (progs.playedSeconds < this.state.length){

                this.setState({ current: progs.playedSeconds*100})

            }

        }
    }

    handleKeyDown(event) {
        event.preventDefault();

        if(this.state.started && this.props.phase.type !== 'phase_2' ) {

    	    if(event.keyCode == 83 || event.keyCode == 32) {
                if (this.props.retro || (!this.props.retro && (this.props.phase.type === 'baseline'))) {
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
                        started: false
                    })
                    //clearInterval(this.state.timer);
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
           //console.log(labels.segment)
           //console.log(labels.breakpoint)
    	   this.setState({
                stopped:false,
                started: true,
                simult_clicked:false,
                breakpoints: [...this.state.breakpoints, thisbreak],
                segmentations:[...this.state.segmentations, segment]
    	   });
           // Redux may know that video started after labeling
        }
        else {
            let segment = {
                segment_label:labels.segment,
                break_label:labels.breakpoint,
                idx:this.state.clicked_element
            }
            console.log(this.state.clicked_element)
            this.props.submitPhaseForm(segment)
            let identified = this.state.identified.map((e, i) => {return (i === this.state.clicked_element || e) ? true : false})
            // Add
            const segmentations = this.state.segmentations
            segmentations[this.state.clicked_element]["segment_label"] = labels.segment
            segmentations[this.state.clicked_element]["break_label"] = labels.breakpoint
            //segmentations: [...this.state.segmentations, segment],
            this.setState({ 
                stopped:true,
                started: false,
                retro_clicked:false,
                finished: identified.reduce((final, val) => final && val, true), 
                segmentations: segmentations,
                identified: identified
           });

           // Redux may know that video started after labeling

        }

        window.addEventListener('keydown', this.handleKeyDown);
    }

    closeRetroForm(evt) {
        evt.preventDefault()
        this.setState({
            retro_clicked: false,
        })
    }

    cursorDragged(location) {
        console.log(location)
        this.refs.video.seekToLocation(location)
        this.setState({
            thumb_loc: location,
            current: location*100,
            started: true,
            stopped: false
        })
    }

    cursorStarted() {
        console.log('hoppa!')
        this.setState({
            current_stopped: this.state.current,
            started: false,
            stopped: true
        })
    }

    timelineElementClicked(xpos, idx) {
        window.removeEventListener('keydown', this.handleKeyDown);
        this.setState({
            retro_clicked: true,
            form_pos: xpos,
            clicked_element: idx,
        })
    }

    videoPlay() {
        this.setState({
            started: true,
            stopped: false,
        })

    }

    videoPause() {
        this.setState({
            started: false,
            stopped: true,
        })

    }

    videoReady() {
        this.setState({
            video_ready: true
        })
    }

    videoEnds() {

        if (this.props.phase.type !== 'phase_2') {
            this.setState({
                video_ended: true
            })
        }
    }

    handleThumbChange(location) {
        console.log(location)
        this.refs.video.seekToLocation(location)
        this.setState({
            thumb_loc: location
        })

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

                console.log(this.state.segmentations)
                console.log(this.state.breakpoints)

                this.props.savePhaseData({
                    segmentations: this.state.segmentations,
                    duration: this.state.length,
                    type: this.props.phase.type
                })

                if (this.props.phase.type === 'phase_1' && this.props.retro) {
                    this.setState({
                        identified: this.state.segmentations.map((arr) => {return false}),
                        video_ended: false,
                        video_ready: false,
                        finished: false,
                        started: false,
                        stopped:true,
                        current: 0,
                        /*started: false*/
                    })
                }

                if (this.props.phase.type === 'phase_1' && !this.props.retro) {

                    this.reinitializeState()
                }

                if (this.props.phase.type === 'phase_2') {
                }

                
                if (this.props.phase.type === 'baseline') {
                    this.reinitializeState()
                }

            } else {
                this.reinitializeState()
                this.props.nextPhase()
            } 

        } else {
            this.reinitializeState()
            this.props.repeatPhase()
        }

        //<button className='btn btn-default start' onClick={this.props.fetchNextPhases} disabled={this.state.started}> Next Experiment </button> 
        // <p className='instructions'> {this.props.phase.instructions} </p>
    }

	render(){
		return (
			<div /*tabIndex="0" onKeyDown={this.handleKeyDown}*/>

				{ this.props.phase ? 

                    <div >

                    {   this.props.phase.type !== 'end' ? <Navigation active={this.props.phase.type} types={this.props.types}/> : null }

					<div className='phaseWrapper'>

					{ this.props.instructions

						? <div>
							<h2 className='instructionsTitle'>
								{this.props.phase.title}
							</h2>
                            <ul>
                                {this.props.phase.instructions.map((instruction, i) => {
                                        if (instruction.includes("0")) {
                                            const splitted = instruction.split(" ")
                                            let last = splitted[splitted.length-1]
                                            const first = splitted.slice(0, splitted.length-1)
                                            let first_part = first.join(" ")
                                            return <li className='instructions' key={i}> {first_part} <a href="https://youtu.be/7_7cZFR1v70" target="_blank">{last}</a></li>
                                        } else {
                                            return <li className='instructions' key={i}> {instruction} </li> 
                                        }
                                    })
                                }
                            </ul>

                            {
                                this.props.phase.type !== 'end' ?

                                ( this.props.phase.type !== 'between' ?

                                    <button className ='btn btn-default' onClick ={this.props.finishedInstructions}>Got it!</button> :
                                    <div>
                                        <button className ='btn btn-default next' onClick ={this.props.endExperiment}> Finish! </button>
                                    </div> )

                                 : null

                            }
		
							
						</div>
	
						: <div >

							<div className='videoComponent'>
								<h2 className='instructionsTitle'> Video </h2>
								{this.props.phase.type === 'phase_2'? <div className='interactionPreventer'></div> : <div className='interactionPreventer'></div>}
								<Video ref="video" onVideoReady={this.videoReady} url={this.props.phase.video !== '' ? this.props.phase.video : this.props.video } updateDuration={this.updateDuration} onVideoProgress={this.progress} play={this.state.started} whenEnd={this.videoEnds} onThumbChange={this.handleThumbChange} />
							</div>

							<div  className='timelineComponent'>
								<h2 className='instructionsTitle'> Timeline </h2>
								<p className='instructions'> Press space bar to provide breakpoints. </p>
                                {this.props.phase.type === 'phase_2' && this.state.retro_clicked? <div className='timelineInteractionPreventer'></div> : null}
								<Timeline end={this.props.length ? mapSecsToMiliSecs(this.props.length) : (this.props.phase.vid_length ? mapSecsToMiliSecs(this.props.phase.vid_length) : 10000)} onElementClick={this.timelineElementClicked} onDragEnd={this.cursorDragged} onDragStart={this.cursorStarted} length={this.props.length ? this.props.length : (this.props.phase.vid_length ? this.props.phase.vid_length : 10)} time={this.state.current}  playing={this.state.started} breaks={this.state.breakpoints} finished={this.state.finished} identified={this.state.identified} showLabels={this.props.retro && (this.props.phase.type === 'phase_2')} />
							</div>

							{this.state.simult_clicked ? <SimultForm onItsSubmit={this.handleChildSubmit} xPos={this.state.form_pos} isSimult={true}/> : null}

                            {this.state.retro_clicked ? <SimultForm onItsSubmit={this.handleChildSubmit} identified={this.state.identified} xPos={this.state.form_pos} isSimult={false} onClose={this.closeRetroForm} /> : null}

                            { 
                                (this.props.phase.type === 'phase_2' && this.props.retro) || (this.props.phase.type === 'phase_1' && !this.props.retro) ? 

							     <button className ='btn btn-default next' onClick={this.savePhase} disabled={!this.state.finished}> Finalize </button> :

                                 <button className ='btn btn-default next' onClick={this.savePhase} disabled={!this.state.finished}> Next Phase </button>
                            }

							{  (this.props.phase.type === 'phase_1' && !this.props.retro) ? 

								<button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.state.started} > Start </button>

								:  ( (this.props.phase.type === 'phase_2' && this.props.retro)  ?

                                    (this.state.started ?

                                    <button className='btn btn-default start' onClick={this.videoPause} disabled={!this.state.started} > Pause </button>

                                    :   <button className='btn btn-default start' onClick={this.videoPlay} disabled={this.state.started} > Play </button> )

                                    :   <button className='btn btn-default start' onClick={this.initiatePhase} disabled={this.state.started} > Start </button>  )

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
