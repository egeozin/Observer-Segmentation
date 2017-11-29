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


const permuter2 = function(videoList) {
	const flip = Math.floor(Math.random()*2)
	return flip ? videoList[flip] : videoList[flip]
}

module.exports = {
	permuter,
	permuter2
}