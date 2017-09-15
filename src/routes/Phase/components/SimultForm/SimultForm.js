import React, {Component, PropTypes} from 'react'
import './SimultForm.scss'

import type {PhaseObject} from '../interfaces/phase'

type Props = {
	simultForm: Function,
    onItsSubmit:Function
};

export default class SimultForm extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.handleBrkpntChange = this.handleBrkpntChange.bind(this)
        this.handleSgmntChange = this.handleSgmntChange.bind(this)
        this.persistLabels = this.persistLabels.bind(this)
        this.state = {
        	breakpointLabel: '',
        	segmentLabel: ''
        }
    }

    persistLabels(event) {
        event.preventDefault();
        const brkpntRef = this.refs.brkpntLabel;
        const sgmntRef = this.refs.sgmntLabel;
        if (brkpntRef && sgmntRef) {
            "ref here?"
            this.props.onItsSubmit({breakpoint:brkpntRef.value, segment:sgmntRef.value});
            brkpntRef.value = sgmntRef.value = '';
        } else {
            const error = true;
        }

    }

    validate = (breakp, segment) => ({
        breakp: breakp.length === 0,
        segment: segment.length === 0
    })

    canSubmit = () => {
    	const errors = this.validate(this.state.breakpointLabel, this.state.segmentLabel);
    	const isDisabled = Object.keys(errors).reduce((acc, curr, currI, arr) => {
    		return acc && curr;
    	}, true)
    	return !isDisabled;
    }

    handleBrkpntChange = (evt) => {
    	this.setState({breakpointLabel: evt.target.value});
    }

    handleSgmntChange = (evt) => {
        console.log("fire!")
    	this.setState({segmentLabel: evt.target.value});
    }

	render(){
		const errors = this.validate(this.state.breakpointLabel, this.state.segmentLabel);
		const isDisabled = Object.keys(errors).some(x => errors[x])
		
		return (

			<div className='simultForm'>

				<form onSubmit={this.persistLabels}>
					<h3>Labels</h3>
					<input className="breakpointid" placeholder="Breakpoint Label"  value={this.state.breakpointLabel} ref="brkpntLabel" onChange={this.handleBrkpntChange} />
					<textarea className="segmentid" placeholder="Segment Label" value={this.state.segmentLabel} ref="sgmntLabel" onChange={this.handleSgmntChange} />
					<hr className='divider'/>
					<button className='submit' disabled={isDisabled}>Done!</button>
				</form>
				
			</div>
	
		)
	}

}

SimultForm.propTypes = {
}