import React from 'react'
import LoginHeader from '../../components/LoginHeader'
//import './CoreLayout.scss'
import '../../styles/core.scss'

export const LoginLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='login-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default LoginLayout