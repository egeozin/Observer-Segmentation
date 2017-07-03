import React, {Component, PropTypes} from 'react';
import ReactPlayer from 'react-player'
import {youtubeUrlMaker} from 'utils/helpers'
import './Video.scss';


export default class Video extends Component {


	constructor(props){
		super(props);
	}

	componentWillMount () {

	}

	render () {

		const videoUrl = youtubeUrlMaker(this.props.url)

		return <ReactPlayer className='playerWrapper' url={videoUrl} playing={this.props.play} />

	}


}