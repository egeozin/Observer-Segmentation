import React from 'react'
//import './CoreLayout.scss'
import '../../styles/core.scss'

export const PhaseLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='phase-layout__viewport'>
      {children}
    </div>
  </div>
)

PhaseLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default PhaseLayout