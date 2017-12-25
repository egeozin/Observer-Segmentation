import React, {Component, PropTypes} from 'react'
import './Auth.scss'

import {emailSignUpRequest} from '../modules/auth'
import type {AuthObject} from '../interfaces/auth'

type Props = {
	authed: Boolean,
	emailSignUpRequest: Function
};

export default class Auth2 extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.state = {
        	email: '',
        }
    }

    signUpRequest = (evt) => {
        evt.preventDefault();
    	const emailRef = this.refs.email;
    	//const passwordRef = this.refs.password;
    	if (emailRef) {
    		this.props.emailSignUpRequest({email:emailRef.value});
    		emailRef.value '';
    	} else {
    		const error = true;
    	}

    }

    validate = (email) => ({
    	email: email.length === 0
    })

    canSubmit = () => {
    	const errors = this.validate(this.state.email);
    	const isDisabled = Object.keys(errors).reduce((acc, curr, currI, arr) => {
    		return acc && curr;
    	}, true)
    	return !isDisabled;
    }

    handleEmailChange = (evt) => {
    	this.setState({email: evt.target.value});

    }

    handlePasswordChange = (evt) => {
    	this.setState({password: evt.target.value});
    }

	render(){
		const errors = this.validate(this.state.email);
		const isDisabled = Object.keys(errors).some(x => errors[x])
		
		return (

			<div className='authForm'>

				<form onSubmit={this.signUpRequest}>
					<h3>Sign-Up Form</h3>
					<input placeholder="Email"  value={this.state.email} ref="email" onChange={this.handleEmailChange}/>
					<hr className='divider'/>
					<button className='submit' disabled={isDisabled}>Sign Up</button>
				</form>
				
			</div>
	
		)
	}

}

Auth2.propTypes = {
	authed: PropTypes.bool.isRequired
}
