import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchVideo, saveRecord } from '../modules/record'
import Record from '../components/Record'
import type { RecordObject, RecordStateObject } from '../interfaces/record'


let Timeline = React.createClass({

	getInitialState() {
		return {
			elapsed: 0,
		}
	},

	componentDidMount: function(){

	}


})