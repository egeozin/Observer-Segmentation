import React, {Component, PropTypes} from 'react'

import './Phase.scss'
import Navigation from '../Navigation'
import Instructions from '../Instructions'
import type {PhaseObject} from '../interfaces/phase'

import {fetchPhases, nextPhase, finishedInstructions} from '../../modules/phase'

type Props = {
	phase: ?PhaseObject,
	fetchPhases: Function,
	nextPhase: Function,
	finishedInstructions: Function
};

export default class Phase extends Component {

	//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
    }

    componentWillMount() {
    	//this.props.fetchPhases();
    }

	render(){
		
		return (
			<div>
				<Navigation />
			
			</div>
		)
	}

}

Phase.propTypes = {

	phase: PropTypes.arrayOf(PropTypes.shape({
		cuid : PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		instructions: PropTypes.string.isRequired,
		video: PropTypes.string,
		order:PropTypes.number.isRequired,
		type:PropTypes.string.isRequired
	})).isRequired
	
}
