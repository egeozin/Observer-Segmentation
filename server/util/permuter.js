const permuter = function(videoList) {

	const flip = Math.floor(Math.random()*2)

	if (flip === 0) {
		let idx = Math.floor(Math.random()*6)
		return videoList.thick[idx]

	} else {
		let idx = Math.floor(Math.random()*6)
		return videoList.trace[idx]

	}

}

module.exports = {
	permuter
}