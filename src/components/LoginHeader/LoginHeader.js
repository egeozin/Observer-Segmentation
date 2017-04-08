import React from 'react'
import { IndexLink, Link } from 'react-router'
import './LoginHeader.scss'

export const LoginHeader = () => (
<div className='navBar'>
    <h1>Observe the Observer</h1>
    <ul>
      <li>
        <IndexLink to='/' activeClassName='activeRoute'>
          Home
        </IndexLink>
      </li>
    </ul>

</div>
)

export default LoginHeader