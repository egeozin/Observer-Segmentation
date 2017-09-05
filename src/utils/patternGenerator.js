/* A generator of line patterns for rendering each segment
 * with random patterns to enable easy differentiation and identification.
 * @module PatternGenerator
 * @param width 
 * @param height
 * @param point
 * @param seed, random seed to generate a particular pattern
*/

export default function PatternGenerator(width, height, point, seed) {

	const that = Object.create(PatternGenerator.prototype);

	const sgmntWidth = width;
	const sgmntHeight = height;
	const point = !!point ? point : 0;

	const lines = []
	const exportData = []


	const generateDist = function () {

	}

	const generateThick = function() {

	}

	const generateLines = function () {

	}

	const generateGray = function () {

	}


	Object.freeze(that);
	return that;

}