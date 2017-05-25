import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
<div className='navBar'>
    <h1>Observing the Observers</h1>
    <ul>
      <li>
        <IndexLink to='/' activeClassName='activeRoute'>
          Home
        </IndexLink>
      </li>
      <li>
        <Link to='/zen' activeClassName='activeRoute'>
          Zen
        </Link>
      </li>
      <li>
        <Link to='/counter' activeClassName='activeRoute'>
          Counter
        </Link>
      </li>
      <li>
        <Link to='/experiment' activeClassName='activeRoute'>
          Experiments
        </Link>
      </li>
    </ul>

</div>
)

export default Header


   /* <Link to='/segments' activeClassName={classes.activeRoute}>
      Segments
    </Link> */