import React, {Component, PropTypes} from 'react'
import './SimultForm.scss'

import type {PhaseObject} from '../interfaces/phase'

type Props = {
	simultForm: Function
};

export default class SimultForm extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.state = {
        	breakpointLabel: '',
        	segmentLabel: ''
        }
    }

    validate = (email, pass) => ({
    	email: email.length === 0,
    	password: pass.length === 0
    })

    persistLabels(event) {
        event.preventDefault();
        const brkpntRef = this.refs.brkpntLabel;
        const sgmntRef = this.refs.sgmntLabel;
        if (brkpntRef && sgmntRef) {
            this.props.onItsSubmit({breakpoint:brkpntRef.value, segment:sgmntRef.value});
            brkpntRef.value = sgmntRef.value = '';
        } else {
            const error = true;
        }

    }

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
    	this.setState({segmentLabel: evt.target.value});
    }

	render(){
		const errors = this.validate(this.state.breakpointLabel, this.state.segmentLabel);
		const isDisabled = Object.keys(errors).some(x => errors[x])
		
		return (

			<div className='simultForm'>

				<form onSubmit={this.props.persistLabels}>
					<h3>Labels</h3>
					<input placeholder="Breakpoint Label"  value={this.state.breakpointLabel} ref="brkpntLabel" onChange={this.handleBrkpntChange}/>
					<input placeholder="Segment Label" value={this.state.segmentLabel} ref= "sgmntLabel" onChange={this.handleSgmntChange}/>
					<hr className='divider'/>
					<button className='submit' disabled={isDisabled}>Done!</button>
				</form>
				
			</div>
	
		)
	}

}

SimultForm.propTypes = {
}