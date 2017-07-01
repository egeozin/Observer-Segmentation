
export const mapSecsToMiliSecs = (secs:Number): Number => {
	return 1000*secs
}


export const youtubeUrlMaker = (endpoint:String): String => {
	return `https://www.youtube.com/watch?v=${endpoint}`
}