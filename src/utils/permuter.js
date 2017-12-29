export const permuter = (videoList:Array): String => {

	const flip = Math.floor(Math.random()*2)

	if (flip === 0) {
		let idx = Math.floor(Math.random()*6)
		return videoList.thick[idx]

	} else {
		let idx = Math.floor(Math.random()*6)
		return videoList.trace[idx]

	}

}


export const permuter2 = (videoList:Array): String => {
	const flip = Math.floor(Math.random()*2)
	return flip ? videoList[flip] : videoList[flip]
}
