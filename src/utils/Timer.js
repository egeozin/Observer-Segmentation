
/* Timer for segmentation experiments with module functionality.
 * @module Timer
 * @params duration
*/

const Timer = function(duration) {

	const that = Object.create(Timer.prototype);

	const isStopped = false;
	const isPaused = false;
	const isTicking = false;
	const isEnded = false;

	const start = 0;
	const paused = 0;
	const last = 0;
	const current = 0;
	const remaining = duration;
	const duration = duration;
	const breakpoints = [];

	that.startTimer = function() {
		start = Date.now();
		isTicking = true;
		const interv = setInterval(step(), 100);
	};

	that.step = function() {
		const current = Math.max(0, remaining - (Date.now() - start))
		if (current === 0 ) {
			clearInterval(interv);
			endTimer();
		}
		return current;
	}

	that.pauseTicking = function() {
		remaining = step();
		clearInterval(interv);
		isPaused= true;
	}

	that.resumeTicking = function() {
		const start = Date.now();
		isTicking = true;
		const interv = setInterval(step(), 100);
		
	}

	const endTimer = function() {
		isEnded = true;
	}

	that.break = function() {
		const elapsed = duration - step();
		breakpoints.push(elapsed);
	}


	Object.freeze(that);
	return that;

}