
/* Timer for segmentation experiments with module functionality.
 * @module Timer
 * @params during (total duration of the video)
*/

//const Timer = function(during) {
export default function Timer(during) {

	const that = Object.create(Timer.prototype);

	const isStopped = false;
	const isPaused = false;
	const isTicking = false;
	const isEnded = false;

	const start = 0;
	const paused = 0;
	const last = 0;
	const current = 0;
	const remaining = during;
	const duration = during;
	const breakpoints = [];

	that.startTimer = function() {
		that.start = Date.now();
		that.isTicking = true;
		const interv = setInterval(step(), 100);
	};

	const step = function() {
		const current = Math.max(0, remaining - (Date.now() - start))
		if (current === 0 ) {
			clearInterval(interv);
			endSignal();
			endTimer();
		}
		return current;
	}

	that.pauseTicking = function() {
		that.remaining = step();
		clearInterval(interv);
		that.isPaused = true;
	}

	that.resumeTicking = function() {
		const start = Date.now();
		that.isTicking = true;
		const interv = setInterval(step(), 100);
		
	}

	const endTimer = function() {
		that.isEnded = true;
	}

	that.returnStep = function() {
		return current;
	}

	const endSignal = function() {
		return that.isEnded
	}

	that.break = function() {
		const elapsed = duration - step();
		breakpoints.push(elapsed);
	}


	Object.freeze(that);
	return that;

}

//module.exports = Timer();

//export default function Timer() {}