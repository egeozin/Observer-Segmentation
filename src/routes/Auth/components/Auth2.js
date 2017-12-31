import React, {Component, PropTypes} from 'react'
import './Auth.scss'

import {emailSignUpRequest} from '../modules/auth'
import type {AuthObject} from '../interfaces/auth'
import keygen from 'keygenerator'

type Props = {
	authed: Boolean,
	emailSignUpRequest: Function
};

keygen._({
    length: 9
});

export default class Auth2 extends Component {

//export const Experiment = (props: Props) => (
    constructor(props){
        super(props);
        this.generateKey = this.generateKey.bind(this);
        this.state = {
        	email: '',
            key: '',
            keyGenerated: false
        }
    }

    signUpRequest = (evt) => {
        evt.preventDefault();
    	const emailRef = this.refs.email;
    	//const passwordRef = this.refs.password;
    	if (emailRef) {
    		this.props.emailSignUpRequest({email:emailRef.value});
    		emailRef.value = '';
    	} else {
    		const error = true;
    	}

    }

    generateKey = (evt) => {
        evt.preventDefault();
        let newKey = keygen.password();
        console.log(newKey);
        this.setState({
            keyGenerated: true,
            key: newKey
        })
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

                <button className='submit' onClick ={this.generateKey} disabled={this.state.keyGenerated}>Generate Survey Key</button>
                {this.state.keyGenerated ? <p>{this.state.key}</p> : null}

				<form onSubmit={this.signUpRequest}>
					<h3>Sign-Up Form</h3>
					<input placeholder="Enter the key"  value={this.state.email} ref="email" onChange={this.handleEmailChange}/>
					<hr className='divider'/>
					<button className='submit' disabled={isDisabled}>Start Experiment</button>
				</form>
				
			</div>
	
		)
	}

}

Auth2.propTypes = {
	authed: PropTypes.bool.isRequired
}
