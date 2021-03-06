
export const mapSecsToMiliSecs = (secs:Number): Number => {
	return 1000*secs
}

export const calcTick = (time:Number, len:Number ,w:Number): Number => {
		return Math.round(time/(len*100)*w)
}

/*
export const calcSegmentWidth = (arr:Array, i:Number ): Number => {
	 return i === 0 ?  arr[i] - 0 : arr[i] - arr[i-1];
} */

export const backToSeconds = (eventPos: Number, len:Number, w: Number):Number => {
	return Math.round((eventPos/w)*len) < (len-1) ? ((eventPos/w)*len).toFixed(2) : (len-1) 
}

export const calcBreak = (breakp:Number, i:Number, len:Number , w:Number): Number => {
	return  i === 0 ? 0 : Math.round(breakp/(len*100)*w)
}

export const calcBreakpoint  = (breakp:Number, len:Number , w:Number): Number => {
	return  Math.round(breakp/(len*100)*w)
}

export const calcSegmentWidth = (segment:Number, i:Number, len:Number ,w:Number, prev:Number): Number => {
	return i === 0 ?  Math.round((segment)/(len*100)*w) : Math.round((segment - prev)/(len*100)*w)
}

export const calcSegmentLabel = (segment:Number, i:Number, len:Number, w:Number, prev: Number):Number => {
	return i === 0 ? Math.round((segment/2)/(len*100)*w) : Math.round(((segment - prev)/2)/(len*100)*w)
}


export const youtubeUrlMaker = (endpoint:String): String => {
	return `https://www.youtube.com/watch?v=${endpoint}`
}