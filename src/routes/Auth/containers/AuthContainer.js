import { connect } from 'react-redux'
import { emailSignUpRequest } from '../modules/auth'

import Auth from '../components/Auth'

import type { AuthObject } from '../interfaces/auth'

const mapActionCreators: {emailSignUpRequest: Function} = {
	emailSignUpRequest
}

const mapStateToProps = (state): {auth: ?AuthObject} => ({
	authed: state.auth.authed
	//saved: state.zen.zens.filter(zen=> state.zen.saved.indexOf(zen.id) !== -1)
})

export default connect(mapStateToProps, mapActionCreators)(Auth)