import React from 'react'
import LoginHeader from '../../components/LoginHeader'
//import './CoreLayout.scss'
import '../../styles/core.scss'

export const LoginLayout = ({ children }) => (
  <div className='container text-center'>
    <LoginHeader />
    <div className='login-layout__viewport'>
      {children}
    </div>
  </div>
)

LoginLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default LoginLayout