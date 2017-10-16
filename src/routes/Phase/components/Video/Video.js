import React, {Component, PropTypes} from 'react';
import ReactPlayer from 'react-player'
import {youtubeUrlMaker} from 'utils/helpers'
import './Video.scss';


export default class Video extends Component {


	constructor(props){
		super(props);
		this.seekToLocation = this.seekToLocation.bind(this);
		this.durationUpdate = this.durationUpdate.bind(this);
		this.state = {
			played: 0
		}
	}

	componentWillMount () {

	}

	seekToLocation(loc) {
		//this.player.seekTo(parseFloat(loc), true)
		this.player.seekTo(loc/55)
	}

	durationUpdate(dur) {
		dur = this.player.getDuration();
		this.props.updateDuration(dur);
	}

	stopVideo() {

	}

	ref = player => {
    	this.player = player
  	}

  	//onDuration={this.props.onThumbChange}

	render () {

		const videoUrl = youtubeUrlMaker(this.props.url)

		return <ReactPlayer ref={this.ref} className='playerWrapper' url={videoUrl} progressFrequency={10} playing={this.props.play} onStart={this.props.whenStart} onProgress={this.props.onVideoProgress} onReady={this.durationUpdate} onPlay={this.props.onVideoReady} onEnded={this.props.whenEnd} onPause={this.props.whenPause}/>

	}


}