import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import './Navigation.scss'

export default class Navigation extends Component {

    constructor(props){
      super(props);

    }

    render () {

      return (
        <div className='navigation'>
            <h1>Observing the Observers</h1>
            <ul>
              {this.props.types.map((type, i) => {
                let actual = type === 'init' ? "Instructions" : (type === 'prep' ? 'Preparatory Phase' : (type === 'phase_1' ? 'Main' : type))
                return type === this.props.active ? 
                                  (<li className='activeYo' key={i}> {actual} </li>) : (<li key={i}> {actual} </li>)

              })}
            </ul>
        
        </div>
     ) }

}

Navigation.propTypes = {

}