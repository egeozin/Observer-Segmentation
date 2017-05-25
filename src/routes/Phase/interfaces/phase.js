export type PhaseSessionObject = {
	video_playing: boolean,
	timeline_active: boolean,
	saving_phase_data: boolean,
	fetching:boolean,
	finished:boolean,
	phases: Array<PhaseObject>,
	current: number,
	order: number,
	instructions, boolean,
	experiment: string,
};

export type PhaseObject = {
	cuid: number,
	video: ?string,
	type: string,
	order: number,
	title: string,
	instructions: string,
	segmentation:?<SegmentationObject>,
};

export type SegmentationObject = {
	breakpoints: Array<number>,
	labels: ?Array<string>,
	type: string,
};


export type RecursiveSegmentationObject = {
	timestamps: Array<number>,
	durations:Array<number>,
	labels: Array<Array>,
	breakpoints:Array<Array>,
}