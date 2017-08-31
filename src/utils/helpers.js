
export const mapSecsToMiliSecs = (secs:Number): Number => {
	return 1000*secs
}

export const calcTick = (time:Number, len:Number ,w:Number): Number => {
		return Math.round(time/(len*10)*w)
}


export const youtubeUrlMaker = (endpoint:String): String => {
	return `https://www.youtube.com/watch?v=${endpoint}`
}