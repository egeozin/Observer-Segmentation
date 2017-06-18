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
    	console.log(this.props)
    	console.log(this.props.phase)
    	//this.props.fetchPhases();
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
							<h2 className='instructionsTitle'>
								Video Component Here
							</h2>
		
							<h2 className='instructionsTitle'>
								Timeline Component Here
							</h2>
		
							<button className ='btn btn-default' onClick ={this.props.nextPhase}>
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
		order:PropTypes.number.isRequired,
		type:PropTypes.string.isRequired
	})),

	instructions: PropTypes.bool.isRequired
	
}
