import React, {Component, PropTypes} from 'react';
import './Timeline.scss';
import * as d3 from 'd3'
import {calcTick, calcSegmentWidth, calcBreak, calcBreakpoint} from 'utils/helpers'
import ReactFauxDOM, {withFauxDOM} from 'react-faux-dom'


class Timeline extends Component {

	constructor(props){
		super(props);
		this.renderD3 = this.renderD3.bind(this)
    	this.updateTime = this.updateTime.bind(this)
    	this.updateAll = this.updateAll.bind(this)
    	this.updateSegments = this.updateSegments.bind(this)
    	this.calcTicks = this.calcTicks.bind(this)
    	this.calcBreaks = this.calcBreaks.bind(this)
    	this.calcBreakpoints = this.calcBreakpoints.bind(this)
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

    	if (this.props.length !== prevProps.length) {
    		this.updateBox()
    	} else if (this.props.time !== prevProps.time ) {
    		this.updateTime()
    	} else if (this.props.breaks !== prevProps.breaks) {
    		console.log('this fired!');
    		this.updateAll()
    	} else if (this.props.showLabels) {
    		this.updateSegments()
    	}
  	}

  	calcTicks () {
  		//console.log(calcTick(datum, this.props.length, this.state.width));
  		return calcTick(this.props.time, this.props.length, this.state.width) + this.state.left
  	}

  	calcBreaks (datum, index) {
  			//console.log(datum);
    		return calcBreak(this.props.breaks[index-1], index,  this.props.length, this.state.width) + this.state.left// +20; 
    }

    calcBreakpoints (datum, index) {
    	return calcBreakpoint(datum, this.props.length, this.state.width) + this.state.left
    }

    calcSegmentWidths (datum, index) {
    		return calcSegmentWidth(datum, index, this.props.length, this.state.width, this.props.breaks[index-1]) //+ 20;
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
			.attr("id", "boxWithTicks")
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
    		.attr("id", "borderPath")
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

		thumb.append("line")
				.attr("id", "thumbline")
		    	.attr("class", "time-axis")
		    	.attr("x1", this.calcTicks)
		    	.attr("y1", -10)
		    	.attr("x2", this.calcTicks )
				.attr("y2", this.state.height + 50)

  	}


  	updateAll () {
  		const time = [this.props.time]
  		const breaks = this.props.breaks
  		const showLabels = this.props.showLabels
  		const onElementClick = this.props.onElementClick
  		//
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
    			.attr("fill-opacity", 0.9)

    	

    	rects.enter().append("line")
    			.attr("class", "time-lines")
    			.attr("x1", this.calcTicks)
    			.attr("y1", 30)
    			.attr("x2", this.calcTicks)
    			.attr("y2", 110)
    			.attr("stroke", "#263238")
    			.attr("stroke-opacity", 0.8)
		

    	thumb.append("line")
			.attr("id", "thumbline")
		    .attr("class", "time-axis")
		    .attr("x1", this.calcTicks)
		    .attr("y1", -10)
		    .attr("x2", this.calcTicks )
			.attr("y2", this.state.height + 50)

		//if (showLabels) {
		//	thumb.attr("class", "time-axis-editable")
    	//}


  	}

  	updateBox () {
  		const time = [this.props.time]
  		const length = this.props.length
  		const breaks = this.props.breaks
  		const showLabels = this.props.showLabels
  		const onElementClick = this.props.onElementClick
  		//
  		//const faux = this.props.connectFauxDOM('div', 'timebar')

    	const thumb = d3.select("#mainFrame")

    	const x = d3.scaleLinear()
    		.domain([0, this.props.end])
    		.range([0, width])

    	console.log(thumb.select("#boxWithTicks"))

    	const g = thumb.select("#boxWithTicks")
		
		g.remove()

    	thumb.append("g")
			.attr("id", "boxWithTicks")
    		.attr("class", "axis axis--grid")
    		.attr("transform", "translate(0," + height + ")")
    		.style("stroke", "red")
    		.call(d3.axisBottom(x)
    			.ticks(Math.round(this.props.end/2000))//.concat(x.domain())
    		    .tickSize(-height)
    		    .tickFormat(function() { return null; }))
  		  .selectAll(".tick")


    	const rects = thumb.selectAll("rect")
    					.data(breaks, function(d){return d;})

    	rects.enter().append("rect")
    			.attr("class", "time-rects")
    			.attr("y", 30)
    			.attr("x", this.calcBreaks)
    			.attr("width", this.calcSegmentWidths)
    			.attr("height", this.state.height)
    			.attr("fill", "#E8E8E8")
    			.attr("fill-opacity", 0.9)


    	rects.enter().append("line")
    			.attr("x1", this.calcTicks)
    			.attr("y1", 30)
    			.attr("x2", this.calcTicks)
    			.attr("y2", 110)
    			.attr("stroke", "#263238")
    			.attr("stroke-opacity", 0.8)

    	thumb.append("line")
			.attr("id", "thumbline")
		    .attr("class", "time-axis")
		    .attr("x1", this.calcTicks)
		    .attr("y1", -10)
		    .attr("x2", this.calcTicks )
			.attr("y2", this.state.height + 50)

  	}


  	updateSegments(){
  		const time = [this.props.time]
  		const breaks = this.props.breaks
  		const showLabels = this.props.showLabels
  		const onElementClick = this.props.onElementClick
  		const identified = this.props.identified
  		//
  		//const faux = this.props.connectFauxDOM('div', 'timebar')

    	const thumb = d3.select("#mainFrame")

    	thumb.select("#thumbline").remove()
    	thumb.selectAll("rect").remove()
    	thumb.selectAll(".time-rects").remove()
    	thumb.selectAll(".time-lines").remove()

    	const rects = thumb.selectAll("rect")
    					.data(breaks, function(d){return d;})

    	rects.enter().append("rect")
    			.attr("class", "time-rects-2")
    			.attr("y", 30)
    			.attr("x", this.calcBreaks)
    			.attr("width", this.calcSegmentWidths)
    			.attr("height", this.state.height)
    			.attr("fill", function(d, i) {
    				if (identified[i]) { return "#74c476"; }
    				else {return "#E8E8E8"}
    			})
    			.attr("fill-opacity", 0.9)
    			.on('mouseover', function(e, i){
    				if (showLabels) {
    					if (identified[i]) {
    						d3.select(this).attr("fill", "#238b45");
    						d3.select(this).attr("fill-opacity", 0.7)
    					} else {
    						d3.select(this).attr("fill", "#fd8d3c");
    						d3.select(this).attr("fill-opacity", 0.7)
    					}		
    				}
            	})
            	.on('mouseout', function(e, i){
            		if (showLabels) {
    					if (identified[i]) {
    						d3.select(this).attr("fill", "#74c476");
    						d3.select(this).attr("fill-opacity", 0.9)
    					} else {
                			d3.select(this).attr("fill", "#E8E8E8");
                			d3.select(this).attr("fill-opacity", 0.9)
    					}
                	}
            	})
            	.on('click', function(e, i){
            		if (showLabels) {
            			let x = d3.select(this).attr("x");
            			let width = d3.select(this).attr("width");
            			let xpos = x + width;
            			let segment = true;
            			onElementClick(xpos, i)
            		}

            	})


    	rects.enter().append("line")
    			.attr("class", "time-lines")
    			.attr("x1", this.calcBreakpoints)
    			.attr("y1", 30)
    			.attr("x2", this.calcBreakpoints)
    			.attr("y2", 110)
    			.attr("stroke", function(d, i) {
    				if (identified[i]) { return "#238b45"; }
    				else {return "#263238"}
    			})
    			.attr("stroke-opacity", 0.8)
    			.on('mouseover', function(){
    				if (showLabels) {
    					d3.select(this).attr("stroke", "#d94701");
    				}
            	})
            	.on('mouseout', function(){
            		if (showLabels) {
                		d3.select(this).attr("stroke", "#263238");
                		d3.select(this).attr("stroke-opacity", 0.8);
                	}
            	})
            	.on('click', function(e, i){
            		if (showLabels) {
            			let xpos = d3.select(this).attr("x1");
            			let segment = false;
            			onElementClick(xpos, i)
            		}

            	})

    	thumb.append("line")
			.attr("id", "thumbline")
		    .attr("class", "time-axis")
		    .attr("x1", this.calcTicks)
		    .attr("y1", -10)
		    .attr("x2", this.calcTicks )
			.attr("y2", this.state.height + 50)

		//if (showLabels) {
		//	thumb.attr("class", "time-axis-editable")
    	//}

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