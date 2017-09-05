export type PhaseSessionObject = {
	video_playing: boolean,
	phase_started:boolean,
	phase_finished: boolean,
	timeline_active: boolean,
	saving_phase_data: boolean,
	fetching:boolean,
	finished:boolean,
	phases: Array<PhaseObject>,
	current: number,
	order: number,
	instructions, boolean,
	experiment: string,
	retro: boolean,
	breakpoints: Array<number>,
	segmentations: Array<SegmentationObject>
};

export type PhaseObject = {
	cuid: string,
	video: ?string,
	vid_length: ?number,
	type: string,
	order: number,
	title: string,
	instructions: string,
	segmentation:?<SegmentationObject>,
};

export type SegmentationObject = {
	breakpoint: number,
	break_label: string,
	segment_label: string,
};

export type RecursiveSegmentationObject = {
	timestamps: Array<number>,
	durations:Array<number>,
	labels: Array<Array>,
	breakpoints:Array<Array>,
}