import React, {Component, PropTypes} from 'react';
import './Timeline.scss';
import * as d3 from 'd3'
import {calcTick} from 'utils/helpers'
import ReactFauxDOM, {withFauxDOM} from 'react-faux-dom'


export default class Timeline extends Component {

	constructor(props){
		super(props);
	}

	//componentDidMount () {
		//const faux = this.props.connectFauxDOM('div', 'bar')
		//d3.select(faux)
		//	.append('div')
		//	.html('Hello World!')
    	//this.props.animateFauxDOM(800)
	//}

	componentWillMount () {

	}

	render () {

		const timebar = ReactFauxDOM.createElement('div')

		const margin = {top: 30, right: 20, bottom: 50, left: 20},
    		width = 700 - margin.left - margin.right,
    		height = 160 - margin.top - margin.bottom;

    	const x = d3.scaleLinear()
    		.domain([0, this.props.end])
    		.range([0, width])

		const svg = d3.select(timebar).append("svg")
				.attr("width", width + margin.left + margin.right )
				.attr("height", height + margin.top + margin.bottom)
				.attr("class", "timelineWrapper")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top +  ")")


		svg.append("g")
    		.attr("class", "axis axis--grid")
    		.attr("transform", "translate(0," + height + ")")
    		//.attr("border", 1)
    		.style("stroke", "red")
    		.call(d3.axisBottom(x)
    			.ticks(Math.round(this.props.end/2000))//.concat(x.domain())
    		    //.ticks(d3.timeMillisecond, 1000)
    		    //.ticks(10)
    		    .tickSize(-height)
    		    .tickFormat(function() { return null; }))
  		  .selectAll(".tick")
    		//.classed("tick--minor", function(d) { return d; })


    	const borderPath = svg.append("rect")
    			.attr("x", 0)
    			.attr("y", 0)
    			.attr("height", height)
    			.attr("width", width)
    			.style("stroke", "lightgray")
    			.style("fill", "none")
    			.style("stroke-width", 1)

    	
    	svg.append("line")
    		.attr("class", "time-axis")
    		.attr("x1", calcTick(this.props.time, this.props.length, width) )
    		.attr("y1", -20)
    		.attr("x2", calcTick(this.props.time, this.props.length, width) )
    		.attr("y2", height + 20)
		

		return timebar.toReact()


	}


}


Timeline.propTypes =  {
	end: PropTypes.number.isRequired,
	time: PropTypes.number,
	length: PropTypes.number
};