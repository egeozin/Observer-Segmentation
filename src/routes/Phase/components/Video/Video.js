import React, {Component, PropTypes} from 'react';
import ReactPlayer from 'react-player'
import {youtubeUrlMaker} from 'utils/helpers'
import './Video.scss';


export default class Video extends Component {


	constructor(props){
		super(props);
		this.seekToLocation = this.seekToLocation.bind(this);
		this.state = {
			played: 0
		}
	}

	componentWillMount () {

	}

	seekToLocation(loc) {
		this.player.seekTo(parseFloat(loc))
		this.player.stopVideo()
	}

	stopVideo() {

	}

	ref = player => {
    	this.player = player
  	}

	render () {

		const videoUrl = youtubeUrlMaker(this.props.url)

		return <ReactPlayer ref={this.ref} className='playerWrapper' url={videoUrl} playing={this.props.play} onStart={this.props.whenStart} onDuration={this.props.durationChange} onPlay={this.props.whenPlay} onPause={this.props.whenPause}/>

	}


}