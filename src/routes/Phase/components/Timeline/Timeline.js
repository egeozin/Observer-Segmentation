import React, {Component, PropTypes} from 'react';
import './Timeline.scss';
import * as d3 from 'd3'
import {calcTick, calcSegmentWidth, calcBreak} from 'utils/helpers'
import ReactFauxDOM, {withFauxDOM} from 'react-faux-dom'


class Timeline extends Component {

	constructor(props){
		super(props);
		this.renderD3 = this.renderD3.bind(this)
    	this.updateTime = this.updateTime.bind(this)
    	this.updateAll = this.updateAll.bind(this)
    	this.calcTicks = this.calcTicks.bind(this)
    	this.calcBreaks = this.calcBreaks.bind(this)
    	this.calcSegmentWidths = this.calcSegmentWidths.bind(this)
    	this.state = {
    		width: 0,
    		height: 0,
    		left: 0, 
    		right: 0, 
    		top: 0,
    		bottom: 0
    	}
	}

	componentDidMount () {
		this.renderD3()
	}

	componentDidUpdate (prevProps, prevState) {
    	// do not compare props.chart as it gets updated in updateD3()
    	if (this.props.breaks !== prevProps.breaks) {
    		console.log('this fired!');
    		this.updateAll()
    	} else if (this.props.time !== prevProps.time) {
    		this.updateTime()
    	}
  	}

  	calcTicks () {
  		//console.log(calcTick(datum, this.props.length, this.state.width));
  		return calcTick(this.props.time, this.props.length, this.state.width) + 20
  	}

  	calcBreaks (datum, index ) {
  			//console.log(datum);
    		return calcBreak(this.props.breaks[index-1], index,  this.props.length, this.state.width) + 20 
    }

    calcSegmentWidths (datum, index) {
    		console.log(calcSegmentWidth(datum, index, this.props.length, this.state.width, this.props.breaks[index-1]));
    		return calcSegmentWidth(datum, index, this.props.length, this.state.width, this.props.breaks[index-1]) + 20;
    }

  	renderD3 () {
  		const time = this.props.time
  		const length = this.props.length
  		const breaks = this.props.breaks

  		const faux = this.props.connectFauxDOM('div', 'timebar')

		const margin = {top: 30, right: 20, bottom: 50, left: 20},
    		width = 700 - margin.left - margin.right,
    		height = 160 - margin.top - margin.bottom;

    	this.setState({width: width, height:height, left:margin.left, right: margin.right, top:margin.top, bottom:margin.bottom})

    	const x = d3.scaleLinear()
    		.domain([0, this.props.end])
    		.range([0, width])

		const svg = d3.select(faux).append("svg")
				.attr("id", "mainFrame")
				.attr("width", width + margin.left + margin.right )
				.attr("height", height + margin.top + margin.bottom)
				.attr("class", "timelineWrapper")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top +  ")")

		svg.append("g")
    		.attr("class", "axis axis--grid")
    		.attr("transform", "translate(0," + height + ")")
    		.style("stroke", "red")
    		.call(d3.axisBottom(x)
    			.ticks(Math.round(this.props.end/2000))//.concat(x.domain())

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
			.attr("id", "thumbline")
			.attr("class", "time-axis")
			.attr("x1", Math.round(time/(length*100)*width))
			.attr("y1", -20)
			.attr("x2", Math.round(time/(length*100)*width))
			.attr("y2", this.state.height + 100)

  	}


  	updateTime () {
  		const time = [this.props.time]
  		const length = this.props.length

    	const thumb = d3.select("#mainFrame")

    	thumb.select("#thumbline").remove()

    	if (this.props.showLabels) {

    	}

		thumb.append("line")
				.attr("id", "thumbline")
		    	.attr("class", "time-axis")
		    	.attr("x1", this.calcTicks)
		    	.attr("y1", -20)
		    	.attr("x2", this.calcTicks )
				.attr("y2", this.state.height + 50)

  	}


  	updateAll () {
  		const time = [this.props.time]
  		const breaks = this.props.breaks

  		//const faux = this.props.connectFauxDOM('div', 'timebar')

    	const thumb = d3.select("#mainFrame")

    	thumb.select("#thumbline").remove()

    	const rects = thumb.selectAll("rect")
    					.data(breaks, function(d){return d;})

    	rects.enter().append("rect")
    			.attr("class", "time-rects")
    			.attr("y", 30)
    			.attr("x", this.calcBreaks)
    			.attr("width", this.calcSegmentWidths)
    			.attr("height", this.state.height)
    			.attr("fill", "#E8E8E8")


    	//svg.append("line")
    	//	.attr("class", "axis-breakpoint")

    	if (this.props.showLabels) {

    	}

    	thumb.append("line")
			.attr("id", "thumbline")
		    .attr("class", "time-axis")
		    .attr("x1", this.calcTicks)
		    .attr("y1", -20)
		    .attr("x2", this.calcTicks )
			.attr("y2", this.state.height + 50)



  	}

	componentWillMount () {


	}

	render () { 
		return (
		    <div>
        		{this.props.timebar}
      		</div>
      	)
	}

}

Timeline.propTypes =  {
	end: PropTypes.number.isRequired,
	time: PropTypes.number,
	length: PropTypes.number
};

const FauxChart = withFauxDOM(Timeline)

export default FauxChart