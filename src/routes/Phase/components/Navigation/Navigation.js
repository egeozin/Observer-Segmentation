import React from 'react'
import { Link } from 'react-router'
import './Navigation.scss'

export const Navigation = () => {

    const isActive = 'True';

    return (
        <div className='navigation'>
            <h1>Observing the Observers</h1>
            <ul>
              <li>
                  Instructions
              </li>
              <li>
                  Prepatory Phase
              </li>
              <li>
                  Baseline
              </li>
              <li>
                  Phase 1
              </li>
              <li>
                  Phase 2
              </li>
              <li>
                  Baseline
              </li>
              <li>
                {isActive}
              </li>
            </ul>
        
        </div>
    )

}

export default Navigation